import React from 'react'

const Subscription = () => {
    return (
        <div className="flex flex-col items-start w-full gap-y-2">
            <span className="text-base text-muted-foreground">
                Current Plan
            </span>
            <span className="text-lg font-medium">
                Free
            </span>
            <span className="text-muted-foreground">
                You are currently on the free plan. You can upgrade to a pro plan to get access to more features.
            </span>
        </div>
    )
}

export default Subscription
