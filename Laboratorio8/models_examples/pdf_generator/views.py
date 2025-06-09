# views.py

import datetime
from django.http import Http404
from models_examples import renderers

def pdf_view(request):
    data = {
        'today': datetime.date.today(),
        'amount': 39.99,
        'customer_name': 'Cooper Mann',
        'invoice_number': 1233434,
        'date': datetime.date.today().strftime('%Y-%m-%d'),
        'pdf_title': 'Invoice #1233434',
    }
    response = renderers.render_to_pdf('pdf_generator/invoice.html', data)
    if response.status_code == 404:
        raise Http404("Invoice not found")

    filename = f"Invoice_{data['invoice_number']}.pdf"
    content = f'inline; filename={filename}'
    if request.GET.get("download"):
        content = f'attachment; filename={filename}'
    response["Content-Disposition"] = content
    return response
