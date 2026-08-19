"use client";
import react from "react";
import { Button } from "./button";
import { LogIn } from "lucide-react";
import { LogOut } from "lucide-react";
import { AuthModal } from "../AuthModal";
import { useState } from "react";
import { signOut } from "@/app/actions";

const AuthButton = ({ user }) => {
  const [showAuthModal, setShowAuthModal] = useState(false);

  if (user) {
    return (
      <form action={signOut}>
        <Button
          variant="outlined"
          size="sm"
          type="submit"
          className="bg-white hover:bg-orange-200 gap-2"
        >
          <LogOut className="w-4 h-4" />
          Log Out
        </Button>
      </form>
    );
  }

  return (
    <>
      <Button
        onClick={() => setShowAuthModal(true)}
        variant="default"
        size="sm"
        className="bg-orange-500 hover:bg-orange-600 gap-2"
      >
        <LogIn className="w-4 h-4" />
        Sign In
      </Button>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
};

export default AuthButton;
