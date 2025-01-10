/**
 * Example custom coded cables.gl op
 */

// welcome to your new op!
// have a look at the documentation:
// https://cables.gl/docs/5_writing_ops/dev_ops/dev_ops

// Import library files from the optional folder
import { exampleFunction } from './lib/exampleLib';

const
    exec = op.inTrigger("Trigger"),
    next = op.outTrigger("Next"),
    result = op.outString("Result"),
    status = op.outBoolNum("status"),
    number = op.outNumber("Example");

exec.onTriggered = () =>
{
    result.set("Chroma Active");
    status.set(true)
    number.set(122)
};

// Basic implementation of the op
function exampleOp(input) {
  // Use the imported library function
  const result = exampleFunction(input);

  // Return the result
  return result;
}

// Export the op
export default exampleOp;
