export default function handleLine(eventEmitter, line) {
  try {
    line = line.trim();
    let [command, ...args] = line.split(" ");

    if (/"|'/g.test(args)) {
      args = args
        .join(" ")
        .split(/["'] | ["']/)
        .map((args) => args.replace(/"|'/g, ""));
    }

    if (
      /^(?:cd | cat | add | add | rm | os | hash)$/.test(command) &&
      args.length === 1
    ) {
        eventEmitter.emit(command, args)
    }else if (/^(?:rn|cp|mv|compress|decompress)$/.test(command) && args.length === 2){
        eventEmitter.emit(command, args)
    }else if (/^(?:up|ls)$/.test(line)){
        eventEmitter.emit(command)
    }else if(/^\.exit$/.test(command)){
        this.close()
    } else{
        throw new Error('Invalid command');
    }
  } catch (error) {
    console.log(error.message);
  }
}
