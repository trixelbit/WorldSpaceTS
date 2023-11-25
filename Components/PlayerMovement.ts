import { Entity, Component } from "../Entities/Entity";
import {InputSystem} from "../Utilities/InputSystem";
import {Vector2} from "../Math/Vector2";
import {Vector3} from "../Math/Vector3";

export class PlayerMovement extends Component
{
  private _maxSpeed: number;
  private _velocity: Vector2 = Vector2.Zero();  
  private _input: Vector2 = Vector2.Zero();  
  private _inputSystem: InputSystem;

  private readonly DRAG_COEFFICIENT: number = 0.05;


  get Velocity(): Vector2
  {
    return this._velocity.Copy();
  }

  constructor(entity: Entity, inputSystem: InputSystem, maxSpeed: number)
  {
    super();
    this._inputSystem = inputSystem; 
    this._maxSpeed = maxSpeed;
  }


  public Update(): void 
  {
    this._input = this.ProcessInput();
    this._velocity = Vector2.Scale(this._input, this._maxSpeed);
    this._velocity = Vector2.Lerp(this._velocity, Vector2.Zero(), this.DRAG_COEFFICIENT);

    const newX = this._entity.WorldPosition.x + (this._velocity.x);
    const newY = this._entity.WorldPosition.y + (this._velocity.y);

    this._entity.WorldPosition = new Vector3(newX, newY, 0);
  }
  
  private ProcessInput(): Vector2
  {
    const left = this._inputSystem.IsKeyDown("a");
    const right = this._inputSystem.IsKeyDown("d");
    const up = this._inputSystem.IsKeyDown("w");
    const down = this._inputSystem.IsKeyDown("s");

    var x = 0;
    var y = 0;

    if(left)
    {
      x -= 1;
    }

    if(right)
    {
      x += 1;
    }

    if(up)
    {
      y -= 1;
    }

    if(down)
    {
      y += 1;
    }

    return Vector2.Normalized(new Vector2(x, y));
  }

  Start(): void {
  }
}

