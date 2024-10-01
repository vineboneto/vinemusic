import { useCallback, useEffect, useState } from "react";

type PropsQuery<T> = {
	fn: () => Promise<T>;
};

export function useQuery<T = unknown>({ fn }: PropsQuery<T>) {
	const [isLoading, setIsLoading] = useState(false);
	const [isRefetch, setIsRefetch] = useState(false);
	const [error, setError] = useState<Error | undefined>();
	const [data, setData] = useState<T>();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const fetchCallback = useCallback(
		async (isMounted: boolean) => {
			setIsLoading(true);
			try {
				const value = await fn();
				setData(value);
			} catch (error) {
				if (error instanceof Error) {
					setError(error);
				}
			} finally {
				if (isMounted) setIsLoading(false);
			}
		},
		[isRefetch],
	);

	useEffect(() => {
		let isMounted = true;

		fetchCallback(isMounted);

		return () => {
			isMounted = false;
		};
	}, [fetchCallback]);

	function refetch() {
		setIsRefetch((prev) => !prev);
	}

	function hasValue(data: T | undefined): data is T {
		return Array.isArray(data) ? data.length > 0 : data !== undefined;
	}

	return {
		isLoading,
		refetch,
		data,
		hasValue,
	};
}

type PropsMutation<TData, TVariables> = {
	fn: (variables: TVariables) => Promise<TData>;
};

export function useMutation<TData = unknown, TVariables = unknown>({
	fn,
}: PropsMutation<TData, TVariables>) {
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState<TData | undefined>(undefined);
	const [error, setError] = useState<Error | undefined>();

	const mutate = useCallback(
		async (variables: TVariables) => {
			setIsLoading(true);
			setError(undefined);
			try {
				const result = await fn(variables);
				setData(result);
			} catch (err) {
				setError(err as Error);
				console.error("Erro durante a mutação:", err);
			} finally {
				setIsLoading(false);
			}
		},
		[fn],
	);

	return {
		isLoading,
		data,
		error,
		mutate,
		hasError: error !== undefined,
	};
}
