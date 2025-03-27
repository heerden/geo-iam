import {IResponse, IResponseValidationError} from "../types/actions.ts";
import {Areas} from '../../../api/src/areas/entities/area.entity.ts';
import {CreateAreaDto} from '../../../api/src/areas/dto/create-area.dto.ts';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const createArea = async (createArea: CreateAreaDto): Promise<IResponse<Areas, IResponseValidationError>> => {
    try {
        const url = `${API_BASE_URL}/areas`;
        console.log("Request URL:", url);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                // Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(createArea)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed parse area create error");
        }

        return {
            status: "success",
            code: 200,
            data,
        };
    } catch (error: any) {
        return {
            status: "error",
            code: 400,
            errors: {
                general: error.message || "Please try again",
            },
        };
    }
};
