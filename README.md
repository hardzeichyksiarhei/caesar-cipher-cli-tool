## Caesar cipher CLI tool (ROT tool)

### Downloading and installing NPM modules

```
$ git clone https://github.com/hardzeichyksiarhei/nodejs-course.git
```

```
$ cd caesar-cipher-cli-tool
```

```
$ npm i
```

### (optional) Installing the application as an NPM module

```
$ [sudo] npm i -g ./
```

### Usage example:

CLI tool accept 4 options:

1.  -s, --shift: a shift
2.  -i, --input: an input file
3.  -o, --output: an output file
4.  -a, --action: an action encode/decode

Encode 1.txt to 2.txt with shift 7:

```
$ [node] rot -s 7 -i "./1.txt" -o "./2.txt" -a encode
```

Decode 2.txt to 3.txt with shift 7:

```
$ [node] rot  --shift 7 --input 2.txt --output 3.txt --action decode
```

Decode stdin to stdout with shift 7:

```
$ [node] rot --action decode --shift 7
```

### NPM scripts

Encode 1.txt to 2.txt with shift 13:

```
$ npm run encode
```

Decode 2.txt to 1.txt with shift 13:

```
$ npm run decode
```
