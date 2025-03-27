import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createArea } from "../../../services/areas.services.ts";

const useAreaCreate = () => {
    const areaSchema = z.object({
        name: z.string(),
        level: z.number(),
        code: z.string(),
        coordinates: z.string(),
    });

    const [isLoading, setIsLoading] = useState(false);

    type AreaSchemaType = z.infer<typeof areaSchema>;

    const { control, handleSubmit, setError } = useForm<AreaSchemaType>({
        resolver: zodResolver(areaSchema),
        defaultValues: {
            name: "",
            level: 0,
            code: "",
            coordinates: "",
        },
    });

    const setErrors = (errors: Record<string, any>) => {
        Object.entries(errors).forEach(([key, value]: any[]) => setError(key, { message: value }));
    };

    const onSubmit = handleSubmit(async (data) => {
        console.log(data);
        setIsLoading(true);
        try {
            const response = await createArea(data);
            if (response.status == "success") {
                console.log("Successfully created area");
            } else {
                setErrors(response.errors);
            }
        } catch (e: any) {
            setErrors(e.message || "Please try again to create the Area record, if the issue persist call support.")
        }
        setIsLoading(false);
    });

    return {
        isLoading,
        control,
        onSubmit,
    };
}

export { useAreaCreate };