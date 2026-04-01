import fs from 'fs';

const apiKey = "AIzaSyBktVxKgv8xD8IJHwhVsXpbO2RM2pfQwNY";

async function listModels() {
    try {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await res.json();
        const models = data.models || [];
        let output = "Available Gemini Models:\n";
        models.forEach(m => {
            if (m.name.includes('gemini')) {
                output += "- " + m.name + "\n";
            }
        });
        fs.writeFileSync("models.txt", output);
        console.log("Wrote to models.txt");
    } catch (e) {
        console.error("Error:", e.message);
    }
}
listModels();
