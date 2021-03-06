package test.erweima;

import java.util.Arrays;
import java.util.List;

/** 
 * 数组转list集合：
 * ·	--  Integer[] a_Integer = new Integer[] { 1, 2, 3, 4 };
 *  	-- List a_int_List = Arrays.asList(a_int);//此过程中最好使用包装类的数组如　new　Integer  
 *  	--
 *  	--	
 *  	--
 * 本类演示了Arrays类中的asList方法 
 * 通过四个段落来演示,体现出了该方法的相关特性. 
 *  
 * (1) 该方法对于基本数据类型的数组支持并不好,当数组是基本数据类型时不建议使用 
 * (2) 当使用asList()方法时，数组就和列表链接在一起了. 
 *     当更新其中之一时，另一个将自动获得更新。 
 *     注意:仅仅针对对象数组类型,基本数据类型数组不具备该特性 
 * (3) asList得到的数组是的没有add和remove方法的 
 *  
 * 阅读相关:通过查看Arrays类的源码可以知道,asList返回的List是Array中的实现的 
 * 内部类,而该类并没有定义add和remove方法.另外,为什么修改其中一个,另一个也自动 
 * 获得更新了,因为asList获得List实际引用的就是数组 
 */  
public class ArrayListAsListTest {
	  
	  
    public static void main(String[] args) {  
  
        /* 段落一:基本数据类型使用asList中的问题 */  
        /* 说明:虽然在JDK1.6中能够将基本数据类型的数组转换成List,但还是有个缺陷 */  
    	/*************************** Arrays.asList()使用时应该使用包装类而非基本数据类型 **/
        int[] a_int = { 1, 2, 3, 4 };  
        /* 预期输出应该是1,2,3,4,但实际上输出的仅仅是一个引用, 这里它把a_int当成了一个元素 */  
        List a_int_List = Arrays.asList(a_int);  
        for (Object object : a_int_List) {  
            System.out.print(object + " ");  
        }  
        System.err.println("Int未强转前输出结果如左--------"); 
        /* 为此我们需要这样遍历其中元素 */  
        int[] _a_int = (int[]) a_int_List.get(0);  
        for (Object object : _a_int) {  
            System.out.print(object + " ");  
        } 
        System.err.println("Int处理后输出结果如左--------"); 
        /*************************** Arrays.asList()使用时应该使用包装类而非基本数据类型 **/
        
        
        
        /*************************** Arrays.asList()使用时应该使用包装类而非基本数据类型2 **/
        /* 段落二:对象类型的数组使用asList,是我们预期的 */  
        Integer[] a_Integer = new Integer[] { 1, 2, 3, 4 };  
        List a_Integer_List = Arrays.asList(a_Integer);  
        for (Object object : a_Integer_List) {  
            System.out.print(object + " ");  
        }  
        System.err.println("Integer输出结果如左--------"); 
        /*************************** Arrays.asList()使用时应该使用包装类而非基本数据类型2 **/

        
        /*************************** Arrays.asList()使用时当更新数组或者asList之后的List,另一个将自动获得更新 **/
        /* 段落三:当更新数组或者asList之后的List,另一个将自动获得更新 */  
        a_Integer_List.set(0, 0); 
        for (Object object : a_Integer_List) {  
            System.out.print(object + " ");  
        }
        System.err.println("Integer先修改list输出结果如左（list输出）--------"); 
        for (int i : a_Integer) {  
            System.out.print(i + " ");  
        }  
        System.err.println("Integer先修改list输出结果如左（数组输出）--------"); 
        System.out.println("若先改int则不可逆-（运行时会报出异常 ）------------------------------");
        a_Integer[0] = 5;  
        /* 段落四:对基本类型数组,通过asList之后的List修改对应的值后,在运行时会报出异常  
         * 但是基本类型数组对应的List是会发生变化的,这是毫无疑问的 
         */  
          
        /* 
         * a_int_List.set(0, 0);  
         * foreach(a_int_List); foreach(a_int); 
         */  
  
        a_int[0] = 5;  
        foreachForBase(a_int_List);  
        foreach(a_int);  
  
    }  
  
    /* 打印方法 */  
    private static void foreach(List list) {  
        for (Object object : list) {  
            System.out.print(object + " ");  
        }  
        System.out.println();  
  
    }  
  
    private static void foreachForBase(List a_int_List) {  
        int[] _a_int = (int[]) a_int_List.get(0);  
        foreach(_a_int);  
    }  
  
    private static void foreach(int[] a_int) {  
        for (int i : a_int) {  
            System.out.print(i + " ");  
        }  
        System.out.println();  
    }  
  
    private static void foreach(Integer[] _a_Integer) {  
        for (int i : _a_Integer) {  
            System.out.print(i + " ");  
        }  
        System.out.println();  
    }  
}
