import FirstClientComponent from "../first-client-component";
import FirstServerComponent from "./first-server-component";
import SecondServerComponent from "./second-server-component";
import { ErrorBoundary } from "react-error-boundary";
import SeconClientComponent from "../second-client-component";
import { serverTrpc } from "@/app/utils/server-trpc";

export default async function SomeServerComponentWrapper() {
  const flag = await serverTrpc.flag.fetch({ feature: "feature-a" });

  return (
    <div className="pl-4 bg-lime-200">
      <h1>Some Server Component Wrapper</h1>
      <div className="pl-5">
        {flag.isEnabled ? (
          <FirstClientComponent>
            <ErrorBoundary
              fallback={
                <div className="text-red-500">Something went wrong</div>
              }
            >
              <FirstServerComponent prooop="Props for FirstServerComponent" />
            </ErrorBoundary>
          </FirstClientComponent>
        ) : (
          <>
            <SeconClientComponent />
            <SecondServerComponent />
          </>
        )}
        <p className="bg-orange-200">Flag value: {String(flag.isEnabled)}</p>
      </div>
    </div>
  );
}
