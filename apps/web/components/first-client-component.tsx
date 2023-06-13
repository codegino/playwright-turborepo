"use client";
import React, { FC, PropsWithChildren, Suspense } from "react";
import { clientTrpc } from "../app/utils/client-trpc";

type ComponentType = FC<PropsWithChildren>;

const FirstComponent: ComponentType = ({ children }) => {
  const hello = clientTrpc.hello.useQuery({ text: "first client" });

  if (!hello.data) {
    return <div>First Client Component Loading...</div>;
  }

  return (
    <div className="bg-yellow-200">
      <p>First Client Component {hello.data.greeting}</p>
      <Suspense fallback={<div>Server Component Loading...</div>}>
        {children}
      </Suspense>
    </div>
  );
};

export default clientTrpc.withTRPC(FirstComponent) as typeof FirstComponent;
