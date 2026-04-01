
import pypdf
import sys

try:
    with open("ParamSinghMLEPublic.pdf", "rb") as f:
        reader = pypdf.PdfReader(f)
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
        print(text)
except Exception as e:
    print(f"Error: {e}")
