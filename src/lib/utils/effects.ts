export function slide(value: number, element: string) {
	return () => {
		const e = document.getElementById(element);

		if (e == null) {
			return;
		}
		e.style['transform'] = `translateX(${value}%)`;
	};
}
