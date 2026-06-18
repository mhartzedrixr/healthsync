"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Briefcase, MapPin, Clock, Upload, GraduationCap, Loader2, AlertCircle, CheckCircle } from "lucide-react"

const jobs = [
  { 
    title: "Biomedical Technician", 
    location: "Binangonan, Rizal", 
    type: "Full-Time", 
    summary: "Responsible for maintenance and calibration of hospital equipment.",
    qualifications: "BS Biomedical Engineering or equivalent." 
  },
  { 
    title: "Sales Representative", 
    location: "Binangonan, Rizal", 
    type: "Full-Time", 
    summary: "Grow our network of partner hospitals and clinics.",
    qualifications: "Experience in medical sales preferred." 
  },
  { 
    title: "Product Specialist", 
    location: "Binangonan, Rizal", 
    type: "Full-Time", 
    summary: "Provide clinical training for lab and imaging equipment.",
    qualifications: "Medical background (Nurse/MedTech) is an advantage." 
  },
  { 
    title: "HR Officer", 
    location: "Binangonan, Rizal", 
    type: "Full-Time", 
    summary: "Manage talent acquisition and employee relations.",
    qualifications: "Degree in HR or Psychology." 
  }
]

export default function CareersPage() {
  const [fullname, setFullname] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [position, setPosition] = useState("")
  const [message, setMessage] = useState("")
  const [resumeName, setResumeName] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [successMsg, setSuccessMsg] = useState("")
  const [errorMsg, setErrorMsg] = useState("")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setResumeName(e.target.files[0].name)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!fullname || !email || !phone || !position) {
      setErrorMsg("PLEASE FILL IN ALL REQUIRED FIELDS (Name, Email, Phone, Position).")
      setSuccessMsg("")
      return
    }

    setSubmitting(true)
    setErrorMsg("")
    setSuccessMsg("")

    try {
      const fullMessage = `Desired Position: ${position}\nUploaded Resume: ${resumeName || "Not Provided"}\n\nCover Letter / Message:\n${message || "No cover letter provided."}`

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: fullname,
          email,
          phone,
          department: "hr",
          message: fullMessage
        })
      })

      const result = await res.json()

      if (!res.ok) {
        throw new Error(result.error || "Failed to submit application.")
      }

      if (result.mocked) {
        setSuccessMsg(`Application simulated successfully! Saved to inquiries.json (routed to HR: jewellvictorio@gmail.com).`)
      } else {
        setSuccessMsg(`Your application has been successfully sent to the HR department!`)
      }

      // Reset form fields
      setFullname("")
      setEmail("")
      setPhone("")
      setPosition("")
      setMessage("")
      setResumeName("")
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to send application. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-muted/20 overflow-hidden">
      <section className="bg-secondary text-white py-24 text-center relative">
        <div className="container mx-auto px-4 relative z-10 animate-in fade-in slide-in-from-top-8 duration-1000">
          <h1 className="text-4xl md:text-5xl font-headline font-bold mb-6">Join the HealthSync Team</h1>
          <p className="text-xl text-secondary-foreground/70 max-w-2xl mx-auto">
            Build your career with a company dedicated to medical excellence and clinical innovation.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-20 -mt-20 blur-3xl" />
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-[1.5fr,1fr] gap-12">
            {/* Job Listings */}
            <div className="space-y-6">
              <h2 className="text-2xl font-headline font-bold text-secondary flex items-center gap-2 animate-in fade-in slide-in-from-left-4 duration-700">
                <Briefcase className="h-6 w-6 text-primary" /> Open Positions
              </h2>
              <div className="grid gap-4">
                {jobs.map((job, i) => (
                  <Card key={i} className="hover:border-primary/50 transition-all shadow-sm group animate-in fade-in slide-in-from-left-8 duration-700 fill-mode-both" style={{ animationDelay: `${i * 150}ms` }}>
                    <CardHeader className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">{job.title}</CardTitle>
                        <Badge variant="secondary" className="uppercase text-[10px] tracking-widest">{job.type}</Badge>
                      </div>
                      <div className="flex gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" /> {job.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" /> Posted 2 days ago
                        </div>
                      </div>
                      <CardDescription className="text-base mb-4">{job.summary}</CardDescription>
                      <div className="flex items-center gap-2 text-sm font-semibold text-secondary">
                        <GraduationCap className="h-4 w-4 text-primary" /> {job.qualifications}
                      </div>
                    </CardHeader>
                    <div className="px-6 pb-6">
                      <Button 
                        variant="outline" 
                        className="w-full sm:w-auto px-10 font-bold uppercase tracking-widest text-xs transition-all hover:bg-primary hover:text-white"
                        onClick={() => {
                          setPosition(job.title.toLowerCase().replace(' ', '-'))
                          // Scroll application form into view
                          document.getElementById("apply-form-card")?.scrollIntoView({ behavior: "smooth" })
                        }}
                      >
                        Apply For This Position
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Application Form */}
            <div id="apply-form-card" className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-1000">
              <Card className="shadow-xl border-none sticky top-24 overflow-hidden">
                <CardHeader className="bg-primary p-8 text-white rounded-t-xl relative">
                  <div className="relative z-10">
                    <CardTitle className="text-2xl">Apply Now</CardTitle>
                    <CardDescription className="text-primary-foreground/70">Submit your application to our HR department.</CardDescription>
                  </div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
                </CardHeader>
                <CardContent className="p-8 bg-white">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="fullname">Full Name</Label>
                      <Input 
                        id="fullname" 
                        placeholder="John Doe" 
                        className="focus:border-primary border-2 h-11" 
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                        disabled={submitting}
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="career-email">Email</Label>
                        <Input 
                          id="career-email" 
                          type="email" 
                          placeholder="john@example.com" 
                          className="focus:border-primary border-2 h-11" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          disabled={submitting}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="career-phone">Phone</Label>
                        <Input 
                          id="career-phone" 
                          placeholder="+63" 
                          className="focus:border-primary border-2 h-11" 
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          disabled={submitting}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Desired Position</Label>
                      <Select value={position} onValueChange={(val) => setPosition(val)} disabled={submitting}>
                        <SelectTrigger className="focus:border-primary border-2 h-11 bg-white">
                          <SelectValue placeholder="Select a job position..." />
                        </SelectTrigger>
                        <SelectContent>
                          {jobs.map(j => (
                            <SelectItem key={j.title} value={j.title.toLowerCase().replace(' ', '-')}>
                              {j.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="resume">Upload CV / Resume (PDF)</Label>
                      <label 
                        htmlFor="resume-input"
                        className="border-2 border-dashed rounded-xl p-8 text-center bg-muted/30 hover:bg-muted/50 transition-all cursor-pointer group hover:border-primary/50 block"
                      >
                        <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2 group-hover:text-primary transition-colors" />
                        <p className="text-xs text-muted-foreground group-hover:text-secondary font-medium">
                          {resumeName ? `Selected: ${resumeName}` : "Click to select your resume (PDF/DOC)"}
                        </p>
                        <input 
                          type="file" 
                          id="resume-input" 
                          className="hidden" 
                          accept=".pdf,.doc,.docx" 
                          onChange={handleFileChange}
                          disabled={submitting}
                        />
                      </label>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="career-msg">Cover Letter / Message (Optional)</Label>
                      <Textarea 
                        id="career-msg" 
                        placeholder="Tell us about yourself..." 
                        className="focus:border-primary border-2 min-h-[100px]" 
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        disabled={submitting}
                      />
                    </div>

                    {/* Feedback Messages */}
                    {errorMsg && (
                      <div className="flex items-center gap-2 text-sm font-semibold text-destructive bg-destructive/10 p-4 rounded-md border border-destructive/20 animate-in fade-in zoom-in-95">
                        <AlertCircle className="h-5 w-5" />
                        {errorMsg}
                      </div>
                    )}
                    {successMsg && (
                      <div className="flex items-center gap-2 text-sm font-semibold text-emerald-600 bg-emerald-500/10 p-4 rounded-md border border-emerald-500/20 animate-in fade-in zoom-in-95">
                        <CheckCircle className="h-5 w-5" />
                        {successMsg}
                      </div>
                    )}

                    <Button 
                      type="submit"
                      className="w-full h-12 font-bold uppercase tracking-widest mt-4 transition-transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-primary/20"
                      disabled={submitting}
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Application"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}