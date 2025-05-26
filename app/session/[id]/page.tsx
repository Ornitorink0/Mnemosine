"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import Stepper, { Step } from "@/components/stepper";

export default function SessionPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p className="mb-4">
          L'accesso alla sessione non è consentita. Non hai eseguito l'accesso o
          è scaduta la sessione. Riaccedi e riprova.
        </p>
        <Button onClick={() => router.push("/auth/signin")}>Accedi</Button>
      </div>
    );
  }

  return (
    <Stepper
      initialStep={1}
      onStepChange={(step) => {
        console.log(step);
      }}
      onFinalStepCompleted={() => console.log("All steps completed!")}
      backButtonText="Previous"
      nextButtonText="Next"
    >
      <Step>
        <h2>Welcome to the React Bits stepper!</h2>

        <p>Check out the next step!</p>
      </Step>

      <Step>
        <h2>Step 2</h2>

        <img
          style={{
            height: "100px",
            width: "100%",
            objectFit: "cover",
            objectPosition: "center -70px",
            borderRadius: "15px",
            marginTop: "1em",
          }}
          src="https://www.purrfectcatgifts.co.uk/cdn/shop/collections/Funny_Cat_Cards_640x640.png?v=1663150894"
        />

        <p>Custom step content!</p>
      </Step>

      <Step>
        <h2>How about an input?</h2>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name?"
        />
      </Step>

      <Step>
        <h2>Final Step</h2>

        <p>You made it!</p>
      </Step>
    </Stepper>
  );
}
