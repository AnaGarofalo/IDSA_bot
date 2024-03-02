#pip install python-docx PyPDF2

from docx import Document
from PyPDF2 import PdfReader
import os


# current_dir = os.getcwd()
current_dir = "/home/ana/Documentos/Blipconnection/IDSA/docs/"
files = os.listdir(current_dir)

headers = open(current_dir+'modelfile_headers.txt')
final_text = headers.read() + '\n\nSYSTEM """\n\n'
headers.close()

for file in files:
    if '.docx' in file:
        document = Document(current_dir + file)
        for paragraph in document.paragraphs:
            final_text = final_text + '\n' + paragraph.text

    elif '.pdf' in file:
        file = PdfReader(current_dir + file) 
        for page in file.pages:
            text = page.extract_text() 
            final_text = final_text  + text
    elif '.txt' in file and 'modelfile_headers' not in file:
        file = open(current_dir + file)
        text = file.read()
        final_text = final_text + '\n' + text
        file.close()


f = open('/home/ana/Documentos/Blipconnection/IDSA/ai/Modelfile', 'w')

f.write(final_text + '\n\n"""') 

f.close()