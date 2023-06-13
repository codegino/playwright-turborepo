"use client";
import { clientTrpc } from "./utils/client-trpc";
import React from "react";

const SomeClientComponent = () => {
  const hello = clientTrpc.hey.useQuery();

  if (!hello.data) {
    return <div>Client Component Loading...</div>;
  }

  return (
    <div>
      SomeClientComponent
      <h1>{hello.data.message}</h1>
    </div>
  );
};

export default clientTrpc.withTRPC(SomeClientComponent);
