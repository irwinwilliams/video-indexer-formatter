export class App {
    constructor() {
        this.message = "Hello, let's read some videoindexer output!";
        this.vi_output_files = {};
        this.vi_output = [];
    }

    parseFiles() {
        console.log("INFO: parsing " + this.vi_output_files.length + " files");
        for (const file of this.vi_output_files) {
            let reader = new FileReader();
            reader.App = this;
            reader.onload = this.outputVIContent;
            reader.readAsText(file);
        }
    }

    outputVIContent(event) {
        let reader = event.currentTarget;
        let transcriptBlocks = JSON.parse(reader.result).breakdowns[0].insights.transcriptBlocks;
        console.log(transcriptBlocks);
        let result = '';
        for (const block of transcriptBlocks) {
            let blockResult = '';
            for (const line of block.lines) {
                blockResult += line.text + ' ';
                result += line.text + ' ';
                this.App.vi_output.push({
                    "timestamp": line.adjustedTimeRange.start + ' - ' + line.adjustedTimeRange.end,
                    "line": line.text
                });
            }
            //this.App.vi_output.push(blockResult);
        }
    }
}