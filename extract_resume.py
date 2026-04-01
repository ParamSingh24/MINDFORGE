
import pypdf
import sys

try:
    with open("ParamSinghMLEPublic.pdf", "rb") as f:
        reader = pypdf.PdfReader(f)
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
    
    # Save simply
    with open("resume_extracted.txt", "w", encoding="utf-8") as f:
        f.write(text)

    # Print safely
    print(text.encode('ascii', 'ignore').decode('ascii'))

except Exception as e:
    print(f"Error: {e}")
