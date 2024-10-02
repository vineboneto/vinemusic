import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";

type PropsQuery<T> = {
	fn: () => Promise<T>;
};

type QueryReturn<T> =
	| {
			isUndefined: true;
			isLoading: false;
			isOk: false;
			refetch: () => void;
			data: undefined;
			error: Error;
			isError: true;
	  }
	| {
			isUndefined: true;
			isLoading: true;
			isOk: false;
			refetch: () => void;
			data: undefined;
			error: undefined;
			isError: false;
	  }
	| {
			isUndefined: true;
			isLoading: false;
			isOk: false;
			refetch: () => void;
			data: (T & (object | null)) | undefined;
			error: undefined;
			isError: false;
	  }
	| {
			isUndefined: false;
			isLoading: false;
			isOk: true;
			refetch: () => void;
			data: T & (object | null);
			error: undefined;
			isError: false;
	  };

export function useQuery<T = unknown>({ fn }: PropsQuery<T>): QueryReturn<T> {
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
					setData(undefined);
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

	useFocusEffect(
		// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
		useCallback(() => {
			refetch();
		}, []),
	);

	const isUndefined = data === undefined;
	const isError = error !== undefined;

	return {
		isUndefined,
		isLoading,
		refetch,
		data,
		error,
		isOk: !isError && !isUndefined,
		isError,
	} as QueryReturn<T>;
}

type PropsMutation<TData, TVariables> = {
	fn: (variables: TVariables) => Promise<TData>;
	onSuccess?: (v: TData) => void;
	onError?: (err: Error) => void;
};

export function useMutation<TData = unknown, TVariables = unknown>({
	fn,
	onError,
	onSuccess,
}: PropsMutation<TData, TVariables>) {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error | undefined>();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const mutate = useCallback(
		async (variables: TVariables) => {
			setIsLoading(true);
			setError(undefined);
			try {
				const result = await fn(variables);
				if (onSuccess) onSuccess(result);
				return result;
			} catch (err) {
				if (err instanceof Error && onError) onError(err);
				setError(err as Error);
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
		isError: error !== undefined,
	};
}
