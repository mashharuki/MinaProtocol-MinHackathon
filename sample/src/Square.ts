import { Field, method, SmartContract, state, State } from 'o1js';

/**
 * Square contract
 */
export class Square extends SmartContract {
  @state(Field) num = State<Field>();

  /**
   * 初期化メソッド
   */
  init() {
    super.init();
    this.num.set(Field(3));
  }

  /**
   * updateメソッド
   * @param square
   */
  @method async update(square: Field) {
    const currentState = this.num.get();
    this.num.requireEquals(currentState);
    square.assertEquals(currentState.mul(currentState));
    this.num.set(square);
  }
}
