import { cookies } from "next/headers";
import React, { FC } from "react";
import { appRouter } from "some-trpc";

const FirstServerComponent: FC<{ prooop: string }> = async ({ prooop }) => {
  const cookieStore = cookies();
  const apiKey = cookieStore.get("x-token")?.value;

  const yow = await appRouter
    .createCaller({ apiKey })
    .locked({ value: "Hi From Server Component" });

  return (
    <div className="pl-4 bg-green-200">
      <p>First Server Component</p>
      <p>Message from TRPC: {yow.something}</p>
      <p className="bg-blue-200">Prop coming from client component: {prooop}</p>
    </div>
  );
};

export default FirstServerComponent;
