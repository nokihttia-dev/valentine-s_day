declare module "canvas-confetti" {
  export type ConfettiOptions = Record<string, unknown>;

  export type ConfettiInstance = (options?: ConfettiOptions) => Promise<null> | null;

  export interface ConfettiFunction extends ConfettiInstance {
    create(canvas?: HTMLCanvasElement, options?: ConfettiOptions): ConfettiInstance;
    reset(): void;
  }

  const confetti: ConfettiFunction;
  export default confetti;
}
