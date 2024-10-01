import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";

type PropsQuery<T> = {
	fn: () => Promise<T>;
};

export function useQuery<T = unknown, R = unknown>({ fn }: PropsQuery<T>) {
	const [isLoading, setIsLoading] = useState(false);
	const [isRefetch, setIsRefetch] = useState(false);
	const [error, setError] = useState<Error | undefined>();
	const [data, setData] = useState<T | undefined>();

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

	useFocusEffect(
		// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
		useCallback(() => {
			refetch();
		}, []),
	);

	return {
		isLoading: isLoading,
		refetch,
		data,
		error,
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
	const [error, setError] = useState<Error | undefined>();

	const mutate = useCallback(
		async (variables: TVariables) => {
			setIsLoading(true);
			setError(undefined);
			try {
				const result = await fn(variables);
				return result;
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
		error,
		mutate,
		hasError: error !== undefined,
	};
}
