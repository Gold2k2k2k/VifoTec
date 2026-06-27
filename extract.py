import os
from docx import Document
import PyPDF2

def extract_pdf(path):
    text = ""
    try:
        with open(path, 'rb') as f:
            reader = PyPDF2.PdfReader(f)
            for page in reader.pages:
                extracted = page.extract_text()
                if extracted:
                    text += extracted + "\n"
    except Exception as e:
        text = f"Error reading PDF: {e}"
    return text

def extract_docx(path):
    text = ""
    try:
        doc = Document(path)
        for para in doc.paragraphs:
            text += para.text + "\n"
    except Exception as e:
        text = f"Error reading DOCX: {e}"
    return text

pdf_path = r"D:\Vifotec_v2\finale-frontend-jwst-project\Báo cáo nghiên cứu\ỨNG DỤNG AI -GIAI BA (1).pdf"
docx_path = r"D:\Vifotec_v2\finale-frontend-jwst-project\Báo cáo nghiên cứu\Thuyết minh dư thi phần mềm - Giai Ba.docx"

pdf_out = r"D:\Vifotec_v2\finale-frontend-jwst-project\Báo cáo nghiên cứu\pdf_text.txt"
docx_out = r"D:\Vifotec_v2\finale-frontend-jwst-project\Báo cáo nghiên cứu\docx_text.txt"

with open(pdf_out, 'w', encoding='utf-8') as f:
    f.write(extract_pdf(pdf_path))

with open(docx_out, 'w', encoding='utf-8') as f:
    f.write(extract_docx(docx_path))

print("Extraction complete.")
