 function processInput(input) {
    // Remove the code block markers
    const processedInput = input.replace(/```[\s\S]*?\n|```/g, '').trim();
    return processedInput;
  }

  export {processInput}