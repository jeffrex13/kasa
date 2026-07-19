import { useState } from "react";
import { LogIn, Phone, Mail, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Step = "login" | "contact" | "otp";

function detectContactType(value: string): "email" | "phone" {
  return value.includes("@") ? "email" : "phone";
}

interface LoginModalProps {
  isOpen: boolean;
  onClose: (open: boolean) => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [step, setStep] = useState<Step>("login");
  const [contact, setContact] = useState("");
  const [otp, setOtp] = useState("");

  const contactType = detectContactType(contact);
  const isEmail = contactType === "email";

  function handleClose(open: boolean) {
    if (!open) {
      setStep("login");
      setContact("");
      setOtp("");
    }
    onClose(open);
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md text-center p-8 rounded-[2rem] border-none shadow-2xl">
        {/* Login options */}
        {step === "login" && (
          <>
            <div className="mx-auto bg-orange-100 w-16 h-16 flex items-center justify-center rounded-full mb-2">
              <LogIn className="w-8 h-8 text-orange-600" />
            </div>
            <DialogHeader>
              <DialogTitle className="text-xl font-bold! text-slate-900 text-center mb-2 tracking-tight">
                Sign in to Inquire
              </DialogTitle>
              <DialogDescription className="text-slate-500 text-sm text-center mb-6 leading-relaxed px-2">
                Create a free account to chat with landlords and secure your
                bedspace instantly.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-3">
              <Button
                className="w-full h-12 text-small font-bold rounded-2xl bg-orange-600 cursor-pointer hover:bg-orange-700 text-white shadow-md transition-transform active:scale-95"
                onClick={() => setStep("contact")}
              >
                Continue with Email or Mobile
              </Button>

              <div className="flex items-center gap-3 my-1">
                <div className="flex-1 h-px bg-slate-200" />
                <span className="text-xs text-slate-400 font-medium">or</span>
                <div className="flex-1 h-px bg-slate-200" />
              </div>

              <Button
                variant="outline"
                className="w-full h-12 text-small font-bold rounded-2xl border-slate-200 text-slate-700 cursor-pointer hover:bg-slate-50 transition-transform active:scale-95"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 mr-2"
                  aria-hidden="true"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Continue with Google
              </Button>
            </div>
            <p className="mt-6 text-xs text-slate-400 font-medium">
              By signing in, you agree to our Terms of Service and Privacy
              Policy.
            </p>
          </>
        )}

        {/* Enter email or phone */}
        {step === "contact" && (
          <>
            <div className="mx-auto bg-orange-100 w-16 h-16 flex items-center justify-center rounded-full mb-2">
              {isEmail ? (
                <Mail className="w-8 h-8 text-orange-600" />
              ) : (
                <Phone className="w-8 h-8 text-orange-600" />
              )}
            </div>
            <DialogHeader>
              <DialogTitle className="text-xl font-bold! text-slate-900 text-center mb-2 tracking-tight">
                {isEmail ? "Enter your email" : "Enter your number"}
              </DialogTitle>
              <DialogDescription className="text-slate-500 text-sm text-center mb-2 leading-relaxed px-2">
                {isEmail
                  ? "We'll send a one-time code to your email address."
                  : "We'll send a one-time code to your mobile number."}
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-3">
              <Input
                type="text"
                placeholder="Email or mobile number"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="rounded-2xl text-center text-base border-slate-200 focus-visible:ring-orange-500"
                autoComplete="email tel"
              />
              <Button
                className="w-full h-12 font-bold rounded-2xl bg-orange-600 cursor-pointer hover:bg-orange-700 text-white shadow-md transition-transform active:scale-95"
                disabled={contact.trim().length < 5}
                onClick={() => setStep("otp")}
              >
                Send Code
              </Button>
              <Button
                variant="ghost"
                className="h-12 text-slate-400 text-sm cursor-pointer"
                onClick={() => {
                  setStep("login");
                  setContact("");
                }}
              >
                Back
              </Button>
            </div>
          </>
        )}

        {/* OTP verification */}
        {step === "otp" && (
          <>
            <div className="mx-auto bg-orange-100 w-16 h-16 flex items-center justify-center rounded-full mb-2">
              <MessageSquare className="w-8 h-8 text-orange-600" />
            </div>
            <DialogHeader>
              <DialogTitle className="text-xl font-extrabold text-slate-900 text-center mb-2 tracking-tight">
                Verify your number
              </DialogTitle>
              <DialogDescription className="text-slate-500 text-sm text-center mb-6 leading-relaxed px-2">
                Enter the 6-digit code sent to{" "}
                <span className="font-semibold text-slate-700">{contact}</span>.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col items-center gap-4">
              <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} className="size-11 text-base" />
                  <InputOTPSlot index={1} className="size-11 text-base" />
                  <InputOTPSlot index={2} className="size-11 text-base" />
                  <InputOTPSlot index={3} className="size-11 text-base" />
                  <InputOTPSlot index={4} className="size-11 text-base" />
                  <InputOTPSlot index={5} className="size-11 text-base" />
                </InputOTPGroup>
              </InputOTP>
              <Button
                className="w-full h-12 font-bold rounded-2xl bg-orange-600 cursor-pointer hover:bg-orange-700 text-white shadow-md transition-transform active:scale-95"
                disabled={otp.length < 6}
              >
                Verify
              </Button>
              <button
                className="text-sm text-orange-600 font-medium cursor-pointer hover:underline"
                onClick={() => setStep("contact")}
              >
                Didn't receive a code? Resend
              </button>
              <Button
                variant="ghost"
                className="h-12 text-slate-400 text-sm cursor-pointer w-full"
                onClick={() => setStep("contact")}
              >
                Back
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
