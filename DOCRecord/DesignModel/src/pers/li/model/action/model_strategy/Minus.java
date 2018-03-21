package pers.li.model.action.model_strategy;

public class Minus extends AbstractCalculator implements ICalculator {
      
        @Override  
        public int calculate(String exp) {  
            int arrayInt[] = split(exp,"-");  
            return arrayInt[0]-arrayInt[1];  
        }  
      
    }  
