export function slide(value: number, element: string) {
  return () => {
    const e = document.getElementById(element);

    if (e == null) {
      return;
    }
    console.log("SLIDEz");
    e.style['transform'] = `translateX(${value}%)`;
  }
}