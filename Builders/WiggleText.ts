import {Entity} from "../Entities/Entity";
import {Oscillate} from "../Components/Oscillate";
import {Vector3} from "../Math/Vector3";
import {FixedSizeForcer} from "../Components/FixedSizeForcer";
import {SlideIn} from "../Components/SlideIn";

export class WiggleText
{
    public get DivElement() : HTMLDivElement
    {
        return this._divElement;
    }
    
    private readonly _divElement : HTMLDivElement;
   
    
    public constructor(text: string, position: Vector3 = Vector3.Zero(), className: string = "")
    {
        this._divElement = new Entity("div", text).Element as HTMLDivElement;
       
        var offset = 0;
        var offsetIncrement = 0.4;
        var amplitude = -10;
        
        for(const character of text)
        {
            const span: Entity = new Entity("span", character, position, this._divElement);
           
            span.Element.textContent = character;
            span.Element.style.position = "relative";
            span.AddComponent(new Oscillate(new Vector3(0, amplitude, 0), 0.5, offset));
            span.AddComponent(new FixedSizeForcer());
            
            if(character === " ")
            {
                span.Element.textContent = "\u00A0";
            }
            
            if(className.length > 0)
            {
                span.Element.className = className;
            }
            
            this._divElement.appendChild(span.Element);
            offset += offsetIncrement;
        }
    }
}