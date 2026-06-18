"use client"

import * as React from "react"
import { useState, useEffect } from "react"
// Load reCAPTCHA script if enabled
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, Mail, MapPin, Clock, Send, AlertCircle, CheckCircle, Loader2 } from "lucide-react"

function ContactContent() {
  const searchParams = useSearchParams()
  const paramDepartment = searchParams.get("department") || ""
  const paramProduct = searchParams.get("product") || ""
  const paramMessage = searchParams.get("message") || ""

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "quotation",
    message: ""
  })
  const [submitting, setSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const [successMsg, setSuccessMsg] = useState("")
  const [mockSavedInfo, setMockSavedInfo] = useState<any>(null)

  // Auto-fill from search params on mount
  useEffect(() => {
    // Load reCAPTCHA script if enabled
    if (process.env.NEXT_PUBLIC_ENABLE_RECAPTCHA === "true") {
      const script = document.createElement('script')
      script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`
      script.async = true
      document.body.appendChild(script)
    }
    // Auto-fill from search params on mount
    let initialMessage = paramMessage
    if (paramProduct && !paramMessage) {
      initialMessage = `Hello Healthsync Team,\n\nI would like to request an official quotation/pricing details for the following product:\n- Product Name: ${paramProduct}\n\nPlease get in touch with me regarding the specifications and bulk pricing options. Thank you.`
    }

    setFormData(prev => ({
      ...prev,
      department: (paramDepartment as any) || prev.department || "quotation",
      message: initialMessage || prev.message
    }))
  }, [paramDepartment, paramProduct, paramMessage])

  const handleSubmit = async (e: React.FormEvent) => {
    // If reCAPTCHA is enabled, obtain token before sending
    e.preventDefault()
    
    // Check if any required field is empty
    if (!formData.name || !formData.email || !formData.phone || !formData.message || !formData.department) {
      setErrorMsg("PLEASE FILL OUT ALL THE REQUIRED FIELDS.")
      setSuccessMsg("")
      setMockSavedInfo(null)
      return
    }

    setSubmitting(true)
    setErrorMsg("")
    setSuccessMsg("")
    setMockSavedInfo(null)
    let recaptchaToken = undefined
    if (process.env.NEXT_PUBLIC_ENABLE_RECAPTCHA === "true") {
      try {
        const token = await (window as any).grecaptcha.execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, { action: "submit" })
        recaptchaToken = token
      } catch (e) {
        console.error('reCAPTCHA error', e)
        setErrorMsg('Failed to verify reCAPTCHA.')
        setSubmitting(false)
        return
      }
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, recaptchaToken }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to route inquiry. Please try again.")
      }

      if (result.mocked) {
        setSuccessMsg(`Simulated: Saved to local inquiries.json & logged to server terminal!`)
        setMockSavedInfo(result.data)
      } else {
        setSuccessMsg(`Inquiry sent successfully!`)
      }

      // Reset form fields
      setFormData({
        name: "",
        email: "",
        phone: "",
        department: "quotation",
        message: ""
      })
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong. Please check your network connection.")
    } finally {
      setSubmitting(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Header */}
      <section className="bg-secondary text-white py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10 animate-in fade-in slide-in-from-top-8 duration-1000">
          <h1 className="text-4xl md:text-5xl font-headline font-bold mb-6">Get In Touch</h1>
          <p className="text-xl text-secondary-foreground/70 max-w-2xl mx-auto">
            Have a question or need a formal quote? Our team is ready to assist your healthcare institution.
          </p>
        </div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full -ml-48 -mt-48 blur-3xl" />
      </section>

      <section className="py-24 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-[1.2fr,0.8fr] gap-12">
            {/* Contact Form */}
            <Card className="shadow-xl border-none animate-in slide-in-from-left-8 duration-1000 fill-mode-both">
              <CardHeader className="bg-primary/5 border-b p-8">
                <CardTitle className="text-2xl font-headline text-secondary flex items-center gap-3">
                  <Send className="h-6 w-6 text-primary" /> Request a Quote
                </CardTitle>
                <CardDescription>Fill out the form below and we'll route it to the appropriate department.</CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-6">
                  
                  {/* Department Dropdown */}
                  <div className="space-y-2 sm:col-span-2 animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-both" style={{ animationDelay: '100ms' }}>
                    <Label>Inquiry Type (Department)</Label>
                    <Select value={formData.department} onValueChange={(val) => handleChange("department", val)}>
                      <SelectTrigger className="focus:ring-primary border-2 h-11 bg-white">
                        <SelectValue placeholder="Select a department to contact..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="quotation">Quotation (Official Email)</SelectItem>
                        <SelectItem value="sales">Sales (Products Inquiry - Sales)</SelectItem>
                        <SelectItem value="hr">Human Resources (Careers - HR)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 sm:col-span-2 animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-both" style={{ animationDelay: '200ms' }}>
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      placeholder="Your Name" 
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      className="focus-visible:ring-primary border-2 h-11 bg-white" 
                      disabled={submitting}
                    />
                  </div>

                  <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-both" style={{ animationDelay: '300ms' }}>
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="Your Email Address" 
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className="focus-visible:ring-primary border-2 h-11 bg-white" 
                      disabled={submitting}
                    />
                  </div>

                  <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-both" style={{ animationDelay: '400ms' }}>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder="+63" 
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      className="focus-visible:ring-primary border-2 h-11 bg-white" 
                      disabled={submitting}
                    />
                  </div>

                  <div className="space-y-2 sm:col-span-2 animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-both" style={{ animationDelay: '500ms' }}>
                    <Label htmlFor="message">Message / Specifications Required</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Type details of the items you require or your questions here..." 
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      className="min-h-[150px] focus-visible:ring-primary border-2 bg-white" 
                      disabled={submitting}
                    />
                  </div>

                  {/* Validation Messages */}
                  <div className="sm:col-span-2 animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-both" style={{ animationDelay: '600ms' }}>
                    {errorMsg && (
                      <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-destructive bg-destructive/10 p-4 rounded-md border border-destructive/20 animate-in fade-in zoom-in-95">
                        <AlertCircle className="h-5 w-5" />
                        {errorMsg}
                      </div>
                    )}
                    {successMsg && (
                      <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-emerald-600 bg-emerald-500/10 p-4 rounded-md border border-emerald-500/20 animate-in fade-in zoom-in-95">
                        <CheckCircle className="h-5 w-5" />
                        {successMsg}
                      </div>
                    )}

                    {mockSavedInfo && (
                      <div className="mb-6 p-4 rounded-lg bg-primary/5 border border-primary/20 text-xs text-secondary space-y-2 animate-in fade-in zoom-in-95">
                        <p className="font-bold text-sm text-primary">Simulated Local Log Details:</p>
                        <div className="grid grid-cols-[80px_1fr] gap-x-2 gap-y-1">
                          <span className="font-semibold text-muted-foreground">Routed To:</span>
                          <span className="font-mono text-primary font-bold">{mockSavedInfo.routedTo}</span>
                          <span className="font-semibold text-muted-foreground">Sender:</span>
                          <span>{mockSavedInfo.name} ({mockSavedInfo.email})</span>
                          <span className="font-semibold text-muted-foreground">Department:</span>
                          <span className="uppercase">{mockSavedInfo.department}</span>
                          <span className="font-semibold text-muted-foreground">File Path:</span>
                          <span className="font-mono bg-muted px-1 py-0.5 rounded text-[10px] select-all">HEALTHSYNC/inquiries.json</span>
                        </div>
                      </div>
                    )}

                    <Button 
                      type="submit" 
                      className="w-full h-12 text-base font-bold uppercase tracking-widest transition-all hover:scale-[1.01] shadow-lg shadow-primary/20"
                      disabled={submitting}
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "SEND MESSAGE"
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info & Map */}
            <div className="space-y-8 animate-in slide-in-from-right-8 duration-1000 fill-mode-both">
              <div className="grid gap-6">
                {[
                  { icon: MapPin, title: "Office Address", content: "Upper Kasinay St., Darangan, Binangonan, Rizal, Philippines" },
                  { icon: Phone, title: "Call Us", content: "+63 915 392 5794" },
                  { icon: Mail, title: "Email Us", content: "healthsync.med@gmail.com" },
                  { icon: Clock, title: "Business Hours", content: "Mon - Fri: 8:00 AM - 5:00 PM" }
                ].map((item, i) => (
                  <Card key={i} className="border-none shadow-md transition-all hover:shadow-lg hover:translate-x-2 animate-in fade-in slide-in-from-right-4 duration-500 fill-mode-both" style={{ animationDelay: `${300 + (i * 100)}ms` }}>
                    <CardContent className="p-6 flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-full text-primary transition-transform hover:scale-110">
                        <item.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-secondary mb-1">{item.title}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item.content}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Map Placeholder */}
              <div className="rounded-2xl overflow-hidden h-[300px] shadow-lg border relative animate-in zoom-in-95 duration-1000 delay-700 fill-mode-both group">
                <iframe 
                  src="https://maps.google.com/maps?q=Healthsync+Medical+equipment+and+Supplies+Trading,+Binangonan,+Rizal&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy"
                  className="transition-opacity group-hover:opacity-90"
                ></iframe>
              </div>

              {/* QR Code Section */}
              <Card className="bg-secondary text-white border-none shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-700 delay-1000 fill-mode-both">
                <CardContent className="p-6 flex items-center justify-between">
                  <div className="space-y-2">
                    <h4 className="font-bold">Scan Business Profile</h4>
                    <p className="text-xs text-secondary-foreground/60">Instant access to our business profile</p>
                  </div>
                  <div className="bg-white p-2 rounded-lg w-20 h-20 transition-transform hover:scale-110">
                     <div className="w-full h-full bg-muted/20 rounded-md" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default function ContactPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading contact form...</div>}>
      <ContactContent />
    </React.Suspense>
  )
}