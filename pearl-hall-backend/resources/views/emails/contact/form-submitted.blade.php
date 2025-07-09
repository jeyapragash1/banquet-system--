<x-mail::message>
# New Contact Form Inquiry

You have received a new message from the contact form on your website.

**From:** {{ $contactData['name'] }}
<br>
**Email:** [{{ $contactData['email'] }}](mailto:{{ $contactData['email'] }})

---

**Message:**
<br>
{{ $contactData['message'] }}

</x-mail::message>