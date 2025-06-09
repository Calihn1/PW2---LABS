from io import BytesIO
from django.http import HttpResponse
from django.template.loader import get_template
from weasyprint import HTML

def render_to_pdf(template_src, context_dict={}):
    template = get_template(template_src)
    html_string = template.render(context_dict)

    pdf_file = BytesIO()
    HTML(string=html_string).write_pdf(target=pdf_file)

    return HttpResponse(pdf_file.getvalue(), content_type='application/pdf')
