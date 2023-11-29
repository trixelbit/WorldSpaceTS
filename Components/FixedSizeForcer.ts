import {Component} from "../Entities/Entity";

export class FixedSizeForcer extends Component
{
    StartLogic() : void
    {
        
    }

    UpdateLogic() : void 
    {
        this._entity.Scale = ( (-this._entity.WorldPosition.z - 1) / 100) + 1;
    }
}