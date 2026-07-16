"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  Plus,
  Trash2,
  FileText,
  Calendar,
  User,
  DollarSign,
} from "lucide-react";

import AppLayout from "@/components/layout/AppLayout";


interface Client {
  _id: string;
  name: string;
  email: string;
}

interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
}

export default function CreateInvoicePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [clients, setClients] = useState<Client[]>([]);

  const [client, setClient] = useState("");

  const [currency, setCurrency] = useState("USD");

  const [notes, setNotes] = useState("");

  const [dueDate, setDueDate] = useState("");

  const [items, setItems] = useState<InvoiceItem[]>([
    {
      description: "",
      quantity: 1,
      unitPrice: 0,
    },
  ]);

  useEffect(() => {
    loadClients();
  }, []);

  async function loadClients() {
    try {
      const res = await fetch("/api/users?role=client");

      const data = await res.json();

      if (data.success) {
        setClients(data.users);
      }
    } catch {
      toast.error("Unable to load clients");
    }
  }

  function addItem() {
    setItems([
      ...items,
      {
        description: "",
        quantity: 1,
        unitPrice: 0,
      },
    ]);
  }

  function removeItem(index: number) {
    const copy = [...items];
    copy.splice(index, 1);
    setItems(copy);
  }

  function updateItem(
    index: number,
    field: keyof InvoiceItem,
    value: string | number
  ) {
    const copy = [...items];

    copy[index] = {
      ...copy[index],
      [field]: value,
    };

    setItems(copy);
  }

  const subtotal = items.reduce(
    (sum, item) =>
      sum + item.quantity * item.unitPrice,
    0
  );

  const tax = subtotal * 0.18;

  const total = subtotal + tax;

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!client) {
      toast.error("Select a client");
      return;
    }

    if (!dueDate) {
      toast.error("Select due date");
      return;
    }

    if (
      items.some(
        (item) => !item.description
      )
    ) {
      toast.error("Description required");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "/api/invoices",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            client,
            dueDate,
            notes,
            currency,
            items,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      toast.success("Invoice created");

      router.push("/admin/dashboard");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppLayout
      title="Create Invoice"
      subtitle="Generate professional invoices for your clients."
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-8"
      >

        <div className="grid gap-6 lg:grid-cols-2">

          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">

            <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-300">

              <User size={18} />

              Client

            </label>

            <select
              value={client}
              onChange={(e) =>
                setClient(e.target.value)
              }
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
            >
              <option value="">
                Select Client
              </option>

              {clients.map((c) => (
                <option
                  key={c._id}
                  value={c._id}
                >
                  {c.name} ({c.email})
                </option>
              ))}
            </select>

          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">

            <div className="grid gap-5 md:grid-cols-2">

              <div>

                <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-300">

                  <Calendar size={18} />

                  Due Date

                </label>

                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) =>
                    setDueDate(e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
                />

              </div>

              <div>

                <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-300">

                  <DollarSign size={18} />

                  Currency

                </label>

                <select
                  value={currency}
                  onChange={(e) =>
                    setCurrency(e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
                >
                  <option>USD</option>
                  <option>INR</option>
                  <option>EUR</option>
                </select>

              </div>

            </div>

          </div>

        </div>
                <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8">

          <div className="mb-8 flex items-center justify-between">

            <div>

              <h2 className="flex items-center gap-3 text-2xl font-bold">

                <FileText size={24} />

                Invoice Items

              </h2>

              <p className="mt-2 text-slate-400">
                Add products or services for this invoice.
              </p>

            </div>

            <button
              type="button"
              onClick={addItem}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              <Plus size={18} />
              Add Item
            </button>

          </div>

          <div className="space-y-6">

            {items.map((item, index) => (

              <div
                key={index}
                className="rounded-2xl border border-slate-700 bg-slate-950 p-6"
              >

                <div className="grid gap-5 lg:grid-cols-12">

                  <div className="lg:col-span-5">

                    <label className="mb-2 block text-sm font-medium text-slate-300">
                      Description
                    </label>

                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) =>
                        updateItem(
                          index,
                          "description",
                          e.target.value
                        )
                      }
                      placeholder="Website Development"
                      className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500"
                    />

                  </div>

                  <div className="lg:col-span-2">

                    <label className="mb-2 block text-sm font-medium text-slate-300">
                      Quantity
                    </label>

                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) =>
                        updateItem(
                          index,
                          "quantity",
                          Number(e.target.value)
                        )
                      }
                      className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500"
                    />

                  </div>

                  <div className="lg:col-span-2">

                    <label className="mb-2 block text-sm font-medium text-slate-300">
                      Unit Price
                    </label>

                    <input
                      type="number"
                      min={0}
                      value={item.unitPrice}
                      onChange={(e) =>
                        updateItem(
                          index,
                          "unitPrice",
                          Number(e.target.value)
                        )
                      }
                      className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500"
                    />

                  </div>

                  <div className="lg:col-span-2">

                    <label className="mb-2 block text-sm font-medium text-slate-300">
                      Total
                    </label>

                    <input
                      readOnly
                      value={(
                        item.quantity *
                        item.unitPrice
                      ).toFixed(2)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 font-semibold text-green-400"
                    />

                  </div>

                  <div className="flex items-end justify-center lg:col-span-1">

                    <button
                      type="button"
                      disabled={items.length === 1}
                      onClick={() =>
                        removeItem(index)
                      }
                      className="rounded-xl bg-red-600 p-3 text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-slate-700"
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>
                <div className="grid gap-8 lg:grid-cols-2">

          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8">

            <h2 className="mb-5 text-2xl font-bold">
              Notes
            </h2>

            <textarea
              rows={8}
              value={notes}
              onChange={(e) =>
                setNotes(e.target.value)
              }
              placeholder="Additional notes for the client..."
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-5 py-4 text-white outline-none focus:border-blue-500"
            />

          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8">

            <h2 className="mb-6 text-2xl font-bold">
              Invoice Summary
            </h2>

            <div className="space-y-5">

              <div className="flex items-center justify-between">

                <span className="text-slate-400">
                  Subtotal
                </span>

                <span className="text-lg font-semibold">
                  ${subtotal.toFixed(2)}
                </span>

              </div>

              <div className="flex items-center justify-between">

                <span className="text-slate-400">
                  Tax (18%)
                </span>

                <span className="text-lg font-semibold">
                  ${tax.toFixed(2)}
                </span>

              </div>

              <div className="border-t border-slate-700 pt-5">

                <div className="flex items-center justify-between">

                  <span className="text-xl font-bold">
                    Total
                  </span>

                  <span className="text-3xl font-bold text-blue-400">
                    ${total.toFixed(2)}
                  </span>

                </div>

              </div>

            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-10 flex w-full items-center justify-center rounded-2xl bg-blue-600 px-6 py-4 text-lg font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-700"
            >
              {loading
                ? "Creating Invoice..."
                : "Create Invoice"}
            </button>

          </div>

        </div>

      </form>

    </AppLayout>

  );
}