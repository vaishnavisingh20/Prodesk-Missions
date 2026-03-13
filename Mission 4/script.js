const form = document.getElementById('letterForm');
const resultArea = document.getElementById('resultArea');
const letterOutput = document.getElementById('letterOutput');
const copyBtn = document.getElementById('copyBtn');
const generateBtn = document.getElementById('generateBtn');

form.addEventListener('submit', function(e) {
    e.preventDefault(); // Stop page reload

    // 1. Capture Data
    const name = document.getElementById('name').value;
    const role = document.getElementById('role').value;
    const company = document.getElementById('company').value;
    const skills = document.getElementById('skills').value;

    // 2. Simulate AI Delay (Loading State)
    generateBtn.textContent = "Generating...";
    generateBtn.disabled = true;

    setTimeout(() => {
        // 3. The "Mock AI" Logic (Hardcoded Template)
        const generatedLetter = `Dear Hiring Manager at ${company},

I am writing to express my strong interest in the ${role} position at ${company}. With my background in ${skills}, I am confident in my ability to contribute effectively to your team.

Throughout my career, I have honed my skills in ${skills}, allowing me to deliver high-quality results. I admire ${company}'s commitment to innovation and would be thrilled to bring my expertise to your organization.

Thank you for considering my application. I look forward to the possibility of discussing this role further.

Sincerely,
${name}`;

        // 4. Display Result
        letterOutput.textContent = generatedLetter;
        resultArea.classList.remove('hidden');
        
        // Reset Button
        generateBtn.textContent = "Generate Cover Letter";
        generateBtn.disabled = false;
    }, 2000); // 2 second delay to simulate thinking
});

// Copy to Clipboard Logic
copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(letterOutput.textContent);
    const originalText = copyBtn.textContent;
    copyBtn.textContent = "Copied!";
    setTimeout(() => copyBtn.textContent = originalText, 2000);
});