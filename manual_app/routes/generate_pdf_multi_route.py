from flask import Blueprint, render_template, redirect, url_for, Response, after_this_request
from pathlib import Path
import pdfkit
import os
import uuid
import tempfile

NAME = "generate_multi_pdf"

bp = Blueprint(NAME, __name__, url_prefix='/generate_multi_pdf')

current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)

# 파일을 하나로 합쳐 페이지 분리를 제한
page_sum = ""

page_list= [
  os.path.join(parent_dir, 'templates', 'contents', 'content1.html'),
  os.path.join(parent_dir, 'templates', 'contents', 'content2.html'),
  os.path.join(parent_dir, 'templates', 'contents', 'content3.html'),
  os.path.join(parent_dir, 'templates', 'contents', 'content4.html'),
  os.path.join(parent_dir, 'templates', 'contents', 'content5.html'),
]

for idx, page in enumerate(page_list) :
  with open(page, 'r', encoding='utf-8') as page :
    page_sum += page.read()
    if idx < len(page_list)-1 :
      page_sum += "\n\n"


@bp.route('/')
def generate_pdf() :
  pdfkit_options = {
    'page-size': 'A4',
    'encoding': 'UTF-8',
    "enable-local-file-access": True,
  }

  # Create a temporary file and get its path
  with tempfile.NamedTemporaryFile(suffix=".pdf", delete=False) as temp_file:
      pdf_path = temp_file.name

  # config = pdfkit.configuration(wkhtmltopdf='C:/Program Files/wkhtmltopdf/bin/wkhtmltopdf.exe')
  config = pdfkit.configuration(wkhtmltopdf='/var/www/manual_app/etc/wkhtmltopdf/bin/wkhtmltopdf.exe')

  pdfkit.from_string(page_sum, pdf_path, options=pdfkit_options, configuration=config)

  @after_this_request
  def remove_pdf(response) :
    if os.path.exists(pdf_path) :
      try :
        os.remove(pdf_path)
      except Exception as e :
        print(f"Error while deleting PDF : {e}")
    return response

  with open(pdf_path, 'rb') as f:
      pdf_data = f.read()

  response = Response(pdf_data, content_type='application/pdf')
  response.headers['Content-Disposition'] = 'attachment; filename=more_user_manual.pdf'
  return response