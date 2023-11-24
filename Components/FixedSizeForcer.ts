import {Component} from "../Entities/Entity";

export class FixedSizeForcer extends Component
{
    Start() : void
    {
        
    }

    Update() : void 
    {
        this._entity.Scale = ( (-this._entity.WorldPosition.z - 1) / 100) + 1;
    }
}