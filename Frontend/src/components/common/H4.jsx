import { cn } from "@/lib/utils"

export const H4 = ({h, className}) => {
    return <h4 className={cn(`tracking-wider text-xl sm:text-4xl pb-4 sm:pb-6`, className)}>{h}</h4>
}