"use client";

import { Button } from '@/components/ui/button';
import { plans } from '@/lib/plans';
import { cn } from '@/lib/utils';
import { Zap } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

type Plan = "monthly" | "annually";

const Cards = () => {

    const [billPlan, setBillPlan] = useState<Plan>("monthly");

    const handleSwitch = () => {
        setBillPlan((prev) => (prev === "monthly" ? "annually" : "monthly"));
    };

    const handlePlan = () => {
        toast.info("Premium plans will be available soon! 😊");
    };


    return (
        <div className="w-full mx-auto md:container">
            <div className="mx-4 mb-8 md:mx-0">
                {/* Plan switch */}
                <div className="flex items-center justify-center space-x-4">
                    <span className="text-base font-medium">
                        Monthly
                    </span>
                    <button
                        onClick={handleSwitch}
                        className="relative rounded-full focus:outline-none"
                    >
                        <div className="w-12 h-6 transition rounded-full shadow-md outline-none bg-primary" />
                        <div
                            className={cn(
                                "absolute inline-flex items-center justify-center w-4 h-4 transition-all duration-200 ease-in-out top-1 left-1 rounded-full bg-background",
                                billPlan === "annually" ? "translate-x-6" : "translate-x-0"
                            )}
                        />
                    </button>
                    <span className="text-base font-medium">
                        Annually
                    </span>
                </div>
                {/* Plan table */}
                <div className="grid max-w-3xl grid-cols-1 mx-auto mt-12 space-y-8 md:grid-cols-2 lg:items-center lg:space-x-8 lg:space-y-0">
                    {plans.map((plan) => (
                        <div key={plan.name} className="flex flex-col w-full p-8 space-y-4 border md:max-w-sm md:p-10 border-border bg-background rounded-2xl">
                            <div className="flex-shrink-0">
                                <span className={cn(
                                    "text-4xl font-semibold tracking-tight",

                                )}>
                                    ${billPlan === "monthly" ? plan.price.monthly : plan.price.yearly}
                                </span>
                            </div>

                            <div className="flex-shrink-0 pb-6 space-y-2 border-b border-border">
                                <h2 className="text-2xl font-medium">
                                    {plan.name}
                                </h2>
                                <p className="text-sm text-neutral-400">
                                    {plan.description}
                                </p>
                            </div>

                            {/* Features */}
                            <ul className='flex-1 space-y-4'>
                                {plan.features.map((feature, index) => (
                                    <li key={index} className="flex items-center justify-start text-sm">
                                        <Zap className="w-4 h-4 mr-2 text-primary/60" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            {/* Button */}
                            <div className="flex-shrink-0 pt-4">
                                <Button className="w-full" onClick={handlePlan}>
                                    {plan.name === "Standard" ? "Upgrade to Standard" : "Upgrade to Premium"}
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Cards
