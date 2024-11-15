import { IDL, query, update } from 'azle';
import { ic } from 'azle/experimental';

export default class {
    message: string = 'Hello world!';
    owner: string = "7zdi6-6h2gk-g4j54-cigti-iiu4u-lj4vy-bewjf-oouoc-dnlck-fyfy5-aae";

    @query([], IDL.Text)
    getMessage(): string {
        if (ic.caller().toText() === this.owner) {
            return this.message;
        } else {
            return "You are not the owner!";
        }
    }

    @update([IDL.Text])
    setMessage(message: string): void {
        this.message = message;
    }
}
