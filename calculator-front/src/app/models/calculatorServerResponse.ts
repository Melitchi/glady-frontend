export class CalculatorServerResponse {
    equal?: { value: number; cards: number[]; };
    floor?: { value: number; cards: number[]; };
    ceil?: { value: number; cards: number[]; };
}