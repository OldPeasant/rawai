export function arrayMove(arr: Array<any>, old_index: number, new_index: number): void {
    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
};

export function arrayMoveLeft(arr: Array<any>, element: any): void {
	var ix = arr.indexOf(element);
	if (ix > 0) {
		arrayMove(arr, ix, ix - 1);
	}
}

export function arrayMoveRight(arr: Array<any>, element: any): void {
	var ix = arr.indexOf(element);
	if (ix < arr.length - 1) {
		arrayMove(arr, ix, ix + 1);
	}
}