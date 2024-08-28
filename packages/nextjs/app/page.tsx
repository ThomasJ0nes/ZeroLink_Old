import {
  ArrowRightIcon,
  CheckCircleIcon,
  GlobeIcon,
  LayersIcon,
  LinkIcon,
  RefreshCcwIcon,
  WalletIcon,
} from "lucide-react";
import { Button } from "~~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~~/components/ui/card";

export default function Component() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Cross-Chain Crypto Subscriptions
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Seamlessly manage and automate your crypto subscriptions across multiple blockchains with our
                  cutting-edge CCIP and Layer Zero powered platform.
                </p>
              </div>
              <div className="space-x-4">
                <Button>Sign Up</Button>
                <Button variant="outline">Subscriptions</Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-4 md:py-24 lg:py-20">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Key Features</h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <GlobeIcon className="w-6 h-6 mr-2 text-blue-600" />
                    Cross-Chain Compatibility
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  Manage subscriptions across multiple blockchains without the hassle of manual transfers.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <RefreshCcwIcon className="w-6 h-6 mr-2 text-blue-600" />
                    Automated Payments
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  Set up recurring payments that execute automatically, saving time and reducing errors.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <WalletIcon className="w-6 h-6 mr-2 text-blue-600" />
                    Secure and Fast
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  ZeroLink uses the the best of both CCIP and LayerZero to provide secure token transfers and fast cross
                  chain messaging.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <div className=" py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-x-8 gap-y-16 lg:grid-cols-2">
              <div className="mx-auto w-full max-w-xl lg:mx-0">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">Supported Chains</h2>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Supported Chains you can use with ZeroLink with more intergratios planned in the future.
                </p>
                <div className="mt-8 flex items-center gap-x-6">
                  <a
                    href="#"
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Create account
                  </a>
                  <a href="#" className="text-sm font-semibold text-gray-900">
                    Contact us <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </div>
              <div className="mx-auto grid w-full max-w-xl grid-cols-3 items-center gap-y-12 sm:gap-y-14 lg:mx-0 lg:max-w-none lg:pl-8">
                <img
                  alt="ETH"
                  src="https://cryptologos.cc/logos/thumbs/ethereum.png?v=033"
                  width={105}
                  height={48}
                  className="max-h-12 w-full object-contain object-left"
                />
                <img
                  alt="OP"
                  src="https://cryptologos.cc/logos/thumbs/optimism-ethereum.png?v=033"
                  width={104}
                  height={48}
                  className="max-h-12 w-full object-contain object-left"
                />
                <img
                  alt="Polygon"
                  src="https://cryptologos.cc/logos/thumbs/polygon.png?v=033"
                  width={140}
                  height={48}
                  className="max-h-12 w-full object-contain object-left"
                />
                <img
                  alt="ARB"
                  src="https://cryptologos.cc/logos/arbitrum-arb-logo.png?v=033"
                  width={136}
                  height={48}
                  className="max-h-12 w-full object-contain object-left"
                />
                <img
                  alt="Binance"
                  src="https://cryptologos.cc/logos/thumbs/bnb.png?v=033"
                  width={158}
                  height={48}
                  className="max-h-12 w-full object-contain object-left"
                />
                <img
                  alt="Statamic"
                  src="https://github.com/base-org/brand-kit/raw/main/logo/in-product/Base_Network_Logo.svg"
                  width={147}
                  height={48}
                  className="max-h-12 w-full object-contain object-left"
                />
              </div>
            </div>
          </div>
        </div>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Revolutionize Your Crypto Subscriptions?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Join our platform and experience the future of cross-chain subscription payments.
                </p>
              </div>
              <Button className="inline-flex items-center">
                Get Started Now
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
