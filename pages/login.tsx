import type { GetServerSideProps } from "next";
import { getProviders, signIn } from "next-auth/react";
import { GoogleCircled } from "iconoir-react";
import { Button } from "../components/Button";
import Layout from "../components/Layout";

interface Props {
  providers: any[];
}

export default function Login({ providers }: Props) {
  return (
    <Layout hideNav>
      {Object.values(providers).map((provider) => (
        <div key={provider.name} className="flex justify-center">
          <Button
            onClick={() => signIn(provider.id, { callbackUrl: "/" })}
            leftIcon={<GoogleCircled />}
          >
            Sign in with {provider.name}
          </Button>
        </div>
      ))}
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();
  return {
    props: { providers },
  };
};
