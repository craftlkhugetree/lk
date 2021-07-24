1. http://192.168.16.122/article/23
spring:
  redis:
    host: 192.168.9.153
    password: 123
  datasource:
#    url: jdbc:postgresql://localhost:5432/xzs
#    username: postgres
#    password: 123456
    driver-class-name: com.oscar.Driver
    url: jdbc:oscar://192.168.16.158:2003/OSRDB/XZS
    username: CNIC
    password: xwl@123

2. postgresql  主键不能自增
除了修改mapper.xml的：
<selectKey keyProperty="id" resultType="java.lang.Integer" order="AFTER">
      SELECT if(max(id) is null,1,MAX(id) + 1 ) as id from XZS.t_user
</selectKey>
还可以：
        user.setId(PKUtil.nextId().intValue());

public class PKUtil {

	private PKUtil() {}
	
	private static class SingletonSequence{
		//workerId ,dataCenterId 根据项目改成实际值，项目间不要重合 避免取值重复
		static final Sequence INSTANCE=new Sequence(4,7);
	}
	
	private static Sequence getInstance() {
		return SingletonSequence.INSTANCE;
	}
	
	/**
	 * 获取ID
	 * @return long
	 */
	public static Long nextId() {
		return PKUtil.getInstance().nextId();
	}
	/**
	 * 获取ID
	 * @return BigInteger
	 */
	public static BigInteger nextBigId() {
		return BigInteger.valueOf(PKUtil.getInstance().nextId());
	}
}
