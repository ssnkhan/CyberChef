/**
 * @author Sajid Nawaz Khan [ssnkhan]
 * @copyright Crown Copyright 2021
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";
import * as mmh from "../vendor/murmurhash.js";

/**
 * Murmur operation
 */
class Murmur extends Operation {

    /**
     * Murmur constructor
     */
    constructor() {
        super();

        this.name = "Murmur";
        this.module = "Default";
        this.description = "Generates a Murmur hash for a given input (seed optional) and generates a signed, non-cryptographic 32-bit hash. Ideally suited for Shodan http.html_hash searches.";
        this.infoURL = "https://github.com/perezd/node-murmurhash";
        this.inputType = "string";
        this.outputType = "number";
        this.args = [
            {
                "name": "Version",
                "type": "option",
                "value": ["3", "2"]
            },
            {
                "name": "Seed",
                "type": "number",
                "value": 0
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {number}
     */
    run(input, args) {
        let version = "2";
        let seed;
        
        if (args && args.length > 0) {
            version = args[0];
        }
        
        if (args && args.length > 1) {
            seed = args[1];
        }
        
        if (version === "2") {
            return mmh.v2(input, seed);
        }
        
        if (version === "3") {
            return mmh.v3(input, seed);
        }
    }

}

export default Murmur;
