/**
 * Custom coded cables.gl op to convert OKHCL color values to RGB
 */

// Define the op with input for OKHCL color values
const
    exec = op.inTrigger("Trigger"),
    next = op.outTrigger("Next"),
    okh = op.inNumber("OKH"),
    okl = op.inNumber("OKL"),
    okc = op.inNumber("OKC"),
    rgb = op.outColor("RGB");

// Implement the conversion from OKHCL to RGB using custom logic
function okhclToRgb(okh, okl, okc) {
    // Fallback for unexpected values
    if (isNaN(okh) || isNaN(okl) || isNaN(okc)) {
        return [0, 0, 0]; // Return black color as fallback
    }

    // Conversion logic
    const h = okh / 360;
    const l = okl / 100;
    const c = okc / 100;

    const a = c * Math.cos(2 * Math.PI * h);
    const b = c * Math.sin(2 * Math.PI * h);

    const l_ = l * 0.01;
    const m = l_ + a * 0.5;
    const s = l_ - a * 0.5;

    const r = Math.max(0, Math.min(1, m + b * 0.5));
    const g = Math.max(0, Math.min(1, l_ - b * 0.5));
    const b_ = Math.max(0, Math.min(1, s + b * 0.5));

    return [r * 255, g * 255, b_ * 255];
}

// Execute the op
exec.onTriggered = () => {
    const rgbValue = okhclToRgb(okh.get(), okl.get(), okc.get());
    rgb.set(rgbValue);
    next.trigger();
};
