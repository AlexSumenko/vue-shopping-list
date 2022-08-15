const useRequest = () => {
    const httpRequest = async <T>(
        method: string,
        requestPath: string,
        requestData?: T,
        baseUrl: string = import.meta.env.VITE_API_BASE_URL
    ) => {
        const response = await fetch(`${baseUrl}${requestPath}`, {
            method,
            body: JSON.stringify(requestData),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const responseData = await response.json();

        let error: Error | null = null;
        if (!response.ok) {
            error = new Error(
                responseData.error?.message ||
                    responseData.error ||
                    'Failed to fetch! Please try again later.'
            );
        }

        return {
            data: responseData,
            error,
        };
    };

    const authRequest = <T>(requestData: T, baseUrl: string) => {
        return httpRequest('POST', '', requestData, baseUrl);
    };

    const deleteRequest = (requestPath: string) => {
        return httpRequest('DELETE', requestPath);
    };

    const getRequest = (requestPath: string) => {
        return httpRequest('GET', requestPath);
    };

    const postRequest = <T>(requestPath: string, requestData: T) => {
        return httpRequest('POST', requestPath, requestData);
    };

    const putRequest = <T>(requestPath: string, requestData: T) => {
        return httpRequest('PUT', requestPath, requestData);
    };

    return {
        authRequest,
        deleteRequest,
        getRequest,
        postRequest,
        putRequest,
    };
};

export default useRequest;
