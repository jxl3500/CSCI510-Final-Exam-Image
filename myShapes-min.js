
class Cube extends cgIShape{
    constructor(a){
        super(),this.makeCube(a)
    }
    makeCube(a){
        a<1&&(a=1);
        var d=-.5,s=-.5,t=1/a,i=0;
        for(i=0;i<a;i++){
            var h,r=i*t;
            for(h=0;h<a;h++){
                var n=h*t;
                this.addTriangle(d+n,s+r,.5,d+n+t,s+r,.5,d+n+t,s+r+t,.5),
                    this.addNormal(0,0,1,0,0,1,0,0,1),
                    this.adduv(n,r,n+t,r,n+t,r+t),
                    this.addTriangle(d+n+t,s+r+t,.5,d+n,s+r+t,.5,d+n,s+r,.5),
                    this.addNormal(0,0,1,0,0,1,0,0,1),
                    this.adduv(n+t,r+t,n,r+t,n,r),
                    this.addTriangle(d+n,s+r,-.5,d+n+t,s+r+t,-.5,d+n+t,s+r,-.5),
                    this.addNormal(0,0,-1,0,0,-1,0,0,-1),
                    this.adduv(n,r,n+t,r+t,n+t,r),
                    this.addTriangle(d+n,s+r,-.5,d+n,s+r+t,-.5,d+n+t,s+r+t,-.5),
                    this.addNormal(0,0,-1,0,0,-1,0,0,-1),
                    this.adduv(n,r,n,r+t,n+t,r+t),
                    this.addTriangle(-.5,s+r,d+n,-.5,s+r,d+n+t,-.5,s+r+t,d+n+t),
                    this.addNormal(-1,0,0,-1,0,0,-1,0,0),
                    this.adduv(n,r,n+t,r,n+t,r+t),
                    this.addTriangle(-.5,s+r+t,d+n+t,-.5,s+r+t,d+n,-.5,s+r,d+n),
                    this.addNormal(-1,0,0,-1,0,0,-1,0,0),
                    this.adduv(n+t,r+t,n,r+t,n,r),
                    this.addTriangle(.5,s+r,d+n+t,.5,s+r,d+n,.5,s+r+t,d+n),
                    this.addNormal(1,0,0,1,0,0,1,0,0),
                    this.adduv(n+t,r,n,r,n,r+t),
                    this.addTriangle(.5,s+r+t,d+n,.5,s+r+t,d+n+t,.5,s+r,d+n+t),
                    this.addNormal(1,0,0,1,0,0,1,0,0),
                    this.adduv(n,r+t,n+t,r+t,n+t,r),
                    this.addTriangle(d+n,.5,s+r+t,d+n+t,.5,s+r+t,d+n,.5,s+r),
                    this.addNormal(0,1,0,0,1,0,0,1,0),
                    this.adduv(n,r+t,n+t,r+t,n,r),
                    this.addTriangle(d+n,.5,s+r,d+n+t,.5,s+r+t,d+n+t,.5,s+r),
                    this.addNormal(0,1,0,0,1,0,0,1,0),
                    this.adduv(n,r,n+t,r+t,n+t,r),
                    this.addTriangle(d+n,-.5,s+r,d+n+t,-.5,s+r+t,d+n,-.5,s+r+t),
                    this.addNormal(0,-1,0,0,-1,0,0,-1,0),
                    this.adduv(n,r,n+t,r+t,n,r+t),
                    this.addTriangle(d+n,-.5,s+r,d+n+t,-.5,s+r,d+n+t,-.5,s+r+t),
                    this.addNormal(0,-1,0,0,-1,0,0,-1,0),
                    this.adduv(n,r,n+t,r,n+t,r+t)
            }
        }
    }
}

class Cylinder extends cgIShape{
    constructor(a,d){
        super(),this.makeCylinder(a,d)
    }
    makeCylinder(a,d){
        var s=-.5;a<3&&(a=3),d<1&&(d=1);
        var t=360/a,i=1/d;
        let h,r,n,e,o,l,M=1/a,c=1/d;
        var u,m,v=0;
        let g,N,T,C;
        for(u=0;u<a;u++)h=(g=.5*Math.cos(radians(v)))+.5,r=(N=.5*Math.sin(radians(v)))+.5,n=(T=.5*Math.cos(radians(v+t)))+.5,e=(C=.5*Math.sin(radians(v+t)))+.5,this.addTriangle(g,s,N,0,s,0,T,s,C),this.addNormal(0,-1,0,0,-1,0,0,-1,0),this.adduv(h,1-r,.5,.5,n,1-e),this.addTriangle(T,.5,C,0,.5,0,g,.5,N),this.addNormal(0,1,0,0,1,0,0,1,0),this.adduv(n,1-e,.5,.5,h,1-r),v+=t;for(l=1,u=0;u<d;u++){var f=u*i;for(v=0,o=1,m=0;m<a;m++)g=.5*Math.cos(radians(v)),N=.5*Math.sin(radians(v)),T=.5*Math.cos(radians(v+t)),C=.5*Math.sin(radians(v+t)),this.addTriangle(g,s+f,N,T,s+f,C,T,s+f+i,C),this.addNormal(g,0,N,T,0,C,T,0,C),this.adduv(o,1-l,o-M,1-l,o-M,1-(l-c)),this.addTriangle(g,s+f,N,T,s+f+i,C,g,s+f+i,N),this.addNormal(g,0,N,T,0,C,g,0,N),this.adduv(o,1-l,o-M,1-(l-c),o,1-(l-c)),v+=t,o-=M;l-=c}
    }
}

class Cone extends
    cgIShape{
    constructor(a,d){
        super(),this.makeCone(a,d)
    }
    makeCone(a,d){
        let s=-.5;a<3&&(a=3),d<1&&(d=1);let t=360/a,i=1/d;var h,r,n,e,o,l,M,c,u,m,v,g,N,T,C,f=0;let p,k,S=1/a,x=1/d,I=.5/d;for(p=0,r=0;r<a;r++)n=I*Math.cos(radians(f)),o=I*Math.sin(radians(f)),M=0,c=.5,u=0,m=e=I*Math.cos(radians(f+t)),v=.5-i,g=l=I*Math.sin(radians(f+t)),N=n,T=.5-i,C=o,this.addTriangle(M,c,u,m,v,g,N,T,C),this.addConeNormal(M,c,u,m,v,g,N,T,C),this.adduv(0,0,p+S,x,p,x),n=.5*Math.cos(radians(f)),o=.5*Math.sin(radians(f)),M=0,c=s,u=0,m=e=.5*Math.cos(radians(f+t)),v=s,g=l=.5*Math.sin(radians(f+t)),N=n,T=s,C=o,this.addTriangle(M,c,u,m,v,g,N,T,C),this.addConeNormal(0,-1,0,0,-1,0,0,-1,0),this.adduv(.5,.5,e+.5,1-(l+.5),n+.5,1-(o+.5)),f+=t,p+=S;for(k=1,h=0;h<d;h++){let d=h*i,n=h,e=0;for(p=0,r=0;r<a;r++){Math.cos(radians(e)),Math.sin(radians(e)),Math.cos(radians(e+t)),Math.sin(radians(e+t));let a=.5*(1-n*i),h=a*Math.cos(radians(e)),r=a*Math.sin(radians(e)),o=a*Math.cos(radians(e+t)),l=a*Math.sin(radians(e+t)),f=.5*(1-(n+1)*i),I=f*Math.cos(radians(e)),b=f*Math.sin(radians(e)),q=f*Math.cos(radians(e+t)),y=f*Math.sin(radians(e+t));a=f,M=o,c=s+d,u=l,m=I,v=s+d+i,g=b,N=h,T=s+d,C=r,this.addTriangle(M,c,u,m,v,g,N,T,C),this.addConeNormal(M,c,u,m,v,g,N,T,C),this.adduv(p+S,1-k,p,1-(k-x),p,1-k),M=o,c=s+d,u=l,m=q,v=s+d+i,g=y,N=I,T=s+d+i,C=b,this.addTriangle(M,c,u,m,v,g,N,T,C),this.addConeNormal(M,c,u,m,v,g,N,T,C),this.adduv(p+S,1-k,p+S,1-(k-x),p,1-(k-x)),e+=t,p+=S
        }
        k-=x
        }
    }

    addConeNormal(a,d,s,t,i,h,r,n,e){
        let o=2*a,l=.5,M=2*s,c=Math.sqrt(o*o+l*l+M*M);o/=c,l/=c,M/=c;let u=2*t,m=.5,v=2*h,g=Math.sqrt(u*u+m*m+v*v);u/=g,m/=g,v/=g;let N=2*r,T=.5,C=2*e,f=Math.sqrt(N*N+T*T+C*C);N/=f,T/=f,C/=f,this.addNormal(o,l,M,u,m,v,N,T,C)
    }
}

class Sphere extends cgIShape{
    constructor(a,d){
        super(),this.makeSphere(a,d)
    }

    makeSphere(a,d){
        let s,t,i,h,r,n,e,o,l,M,c,u,m,v,g;a<3&&(a=3),d<3&&(d=3);
        let N=6.28/a,T=3.14/d,C=1/a,f=1/d,p=T,k=0,S=0,x=1,I=0,b=0,q=Math.sin(T),y=Math.cos(T),j=.5,w=.5*y;
        var z,A;
        for(I=1,A=0;A<a;A++){
            b=0;
            let a=Math.sin(k),d=Math.cos(k),T=Math.sin(k+N);s=0,t=.5,i=0,M=0,c=0,n=Math.cos(k+N)*q*.5,r=w,h=T*q*.5,u=I-C,m=b+f,l=d*q*.5,o=w,e=a*q*.5,v=I,g=b+f,this.addTriangle(s,t,i,e,o,l,h,r,n),this.addNormal(s,t,i,e,o,l,h,r,n),this.adduv(M,c,v,g,u,m),k+=N,I-=C}for(b=f,z=1;z<d;z++){for(S=Math.sin(p),x=Math.cos(p),q=Math.sin(p+T),j=.5*x,w=.5*(y=Math.cos(p+T)),k=0,I=1,A=0;A<=a;A++){let a=Math.sin(k),d=Math.cos(k),T=Math.sin(k+N),p=Math.cos(k+N);i=d*S*.5,t=j,s=a*S*.5,M=I,c=b,n=p*S*.5,r=j,h=T*S*.5,u=I-C,m=b,l=d*q*.5,o=w,e=a*q*.5,v=I,g=b+f,this.addTriangle(e,o,l,h,r,n,s,t,i),this.addNormal(e,o,l,h,r,n,s,t,i),this.adduv(1-v,1-g,1-u,1-m,1-M,1-c),i=p*S*.5,t=j,s=T*S*.5,M=I-C,c=b,n=p*q*.5,r=w,h=T*q*.5,u=I-C,m=b+f,l=d*q*.5,o=w,e=a*q*.5,v=I,g=b+f,this.addTriangle(s,t,i,e,o,l,h,r,n),this.addNormal(s,t,i,e,o,l,h,r,n),this.adduv(1-M,1-c,1-v,1-g,1-u,1-m),k+=N,I-=C}p+=T,b+=f}for(I=1,b=1,k=0,S=Math.sin(p),q=0,y=-1,j=.5*(x=Math.cos(p)),w=-.5,A=0;A<a;A++){let a=Math.sin(k),d=Math.cos(k),T=Math.sin(k+N);i=d*S*.5,t=w,s=a*S*.5,M=I,c=b,n=Math.cos(k+N)*S*.5,r=w,h=T*S*.5,u=I-C,m=b,l=0,o=-.5,e=0,v=1,g=1,this.addTriangle(s,t,i,e,o,l,h,r,n),this.addNormal(s,t,i,e,o,l,h,r,n),this.adduv(M,c,v,g,u,m),k+=N,I-=C}
    }
}

class UniversalLogo extends cgIShape {
    constructor(a,d){
        super(),this.makeUniversalLogo(a,d)
    }

    makeUniversalLogo(a, d) {
        new Sphere(a, d);
        new Cylinder(a, d);
    }

}

class myCylinder extends cgIShape {

    constructor (radialdivision,heightdivision, x_pos, y_pos, height) {
        super();
        this.makeCylinder (radialdivision,heightdivision, x_pos, y_pos, height);
    }

    makeCylinder (radialdivision,heightdivision, x_pos, y_pos, height){
        // var height = 2.5;
        var radius = 1;
        var h_len = height / (heightdivision + 1);
        var theta = 360 / radialdivision;
        var x_lst = []
        var z_lst = [];
        var cur_y = height/2 + y_pos;

        // top
        for (let i = 0; i < radialdivision + 1; i++) {
            var x = Math.cos(radians(i * theta)) * radius + x_pos;
            var z = Math.sin(radians(i * theta)) * radius;
            x_lst.push(x);
            z_lst.push(z);
        }

        for (let i = 0; i < x_lst.length; i++) {
            if (i == x_lst.length - 1) {
                // top circle
                this.addTriangle(x_pos, cur_y, 0, x_lst[i], cur_y, z_lst[i], x_lst[0], cur_y, z_lst[0]);
                this.addTriangle(x_pos, -cur_y, 0, x_lst[i], -cur_y, z_lst[i], x_lst[0], -cur_y, z_lst[0]);

                for (let m = 0; m < heightdivision + 1; m++) {
                    var y1 = cur_y - m * h_len;
                    var y2 = y1 - h_len;
                    this.addTriangle( x_lst[i], y2, z_lst[i], x_lst[0], y1, z_lst[0], x_lst[i], y1, z_lst[i]);
                    this.addTriangle( x_lst[i], y2, z_lst[i], x_lst[0], y2, z_lst[0], x_lst[0], y1, z_lst[0]);

                }


            }
            else {
                this.addTriangle(x_pos, cur_y, 0, x_lst[i], cur_y, z_lst[i], x_lst[i + 1], cur_y, z_lst[i + 1]);
                this.addTriangle(x_pos, -cur_y, 0, x_lst[i], -cur_y, z_lst[i], x_lst[i + 1], -cur_y, z_lst[i + 1]);

                for (let m = 0; m < heightdivision + 1; m++) {
                    var y1 = cur_y - m * h_len;
                    var y2 = y1 - h_len;
                    this.addTriangle( x_lst[i], y2, z_lst[i], x_lst[i + 1], y1, z_lst[i + 1], x_lst[i], y1, z_lst[i]);
                    this.addTriangle( x_lst[i], y2, z_lst[i], x_lst[i + 1], y2, z_lst[i + 1], x_lst[i + 1], y1, z_lst[i + 1]);
                }

            }
        }
    }
}

class myCube extends cgIShape {

    constructor (subdivisions, x_len, y_len, z_len, x_pos, y_pos, z_pos) {
        super();
        this.makeCube (subdivisions, x_len, y_len, z_len, x_pos, y_pos, z_pos);
    }

    makeCube (subdivisions, x_len, y_len, z_len, x_pos, y_pos, z_pos) {
        const x_length_sq = x_len / (subdivisions + 1);
        const y_length_sq = y_len / (subdivisions + 1);
        const z_length_sq = z_len / (subdivisions + 1);



        var cur_x = -x_len / 2 + x_pos;
        var cur_y = -y_len / 2 + y_pos;
        var cur_z = z_len / 2 + z_pos;


        for (let i = 0; i < subdivisions + 1; i++) {
            var x1 = cur_x + i * x_length_sq;
            var x2 = x1 + x_length_sq;
            for (let m = 0; m < subdivisions + 1; m++) {
                var y1 = cur_y + m * y_length_sq;
                var y2 = y1 + y_length_sq;
                this.addTriangle(x1, y1, cur_z, x2, y2, cur_z, x1, y2, cur_z); // 032
                this.addTriangle(x1, y1, cur_z, x2, y1, cur_z, x2, y2, cur_z); // 013
            }
        }


        cur_x = x_len / 2 + x_pos;
        cur_y = -y_len / 2 + y_pos;
        cur_z = z_len / 2 + z_pos;

        for (let i = 0; i < subdivisions + 1; i++) {
            var z1 = cur_z - i * z_length_sq;
            var z2 = z1 - z_length_sq;
            for (let m = 0; m < subdivisions + 1; m++) {
                var y1 = cur_y + m * y_length_sq;
                var y2 = y1 + y_length_sq;
                this.addTriangle(cur_x, y1, z1, cur_x, y2, z2, cur_x, y2, z1); // 173
                this.addTriangle(cur_x, y1, z1, cur_x, y1, z2, cur_x, y2, z2); // 157
            }
        }


        cur_x = -x_len / 2 + x_pos;
        cur_y = -y_len / 2 + y_pos;
        cur_z = -z_len / 2 + z_pos;

        for (let i = 0; i < subdivisions + 1; i++) {
            var x1 = cur_x + i * x_length_sq;
            var x2 = x1 + x_length_sq;
            for (let m = 0; m < subdivisions + 1; m++) {
                var y1 = cur_y + m * y_length_sq;
                var y2 = y1 + y_length_sq;
                this.addTriangle(x1, y1, cur_z, x2, y2, cur_z, x1, y2, cur_z); // 032
                this.addTriangle(x1, y1, cur_z, x2, y1, cur_z, x2, y2, cur_z); // 013
            }
        }


        cur_x = -x_len / 2 + x_pos;
        cur_y = -y_len / 2 + y_pos;
        cur_z = z_len / 2 + z_pos;

        for (let i = 0; i < subdivisions + 1; i++) {
            var z1 = cur_z - i * z_length_sq;
            var z2 = z1 - z_length_sq;
            for (let m = 0; m < subdivisions + 1; m++) {
                var y1 = cur_y + m * y_length_sq;
                var y2 = y1 + y_length_sq;
                this.addTriangle(cur_x, y1, z1, cur_x, y2, z2, cur_x, y2, z1); // 062
                this.addTriangle(cur_x, y1, z1, cur_x, y1, z2, cur_x, y2, z2); // 046
            }
        }

        cur_x = -x_len / 2 + x_pos;
        cur_y = y_len / 2 + y_pos;
        cur_z = z_len / 2 + z_pos;

        for (let i = 0; i < subdivisions + 1; i++) {
            var x1 = cur_x + i * x_length_sq;
            var x2 = x1 + x_length_sq;
            for (let m = 0; m < subdivisions + 1; m++) {
                var z1 = cur_z - m * z_length_sq;
                var z2 = z1 - z_length_sq;
                this.addTriangle(x1, cur_y, z1, x2, cur_y, z2, x1, cur_y, z2); // 276
                this.addTriangle(x1, cur_y, z1, x2, cur_y, z1, x2, cur_y, z2); // 237
            }
        }


        cur_x = -x_len / 2 + x_pos;
        cur_y = -y_len / 2 + y_pos;
        cur_z = z_len / 2 + z_pos;

        for (let i = 0; i < subdivisions + 1; i++) {
            var x1 = cur_x + i * x_length_sq;
            var x2 = x1 + x_length_sq;
            for (let m = 0; m < subdivisions + 1; m++) {
                var z1 = cur_z - m * z_length_sq;
                var z2 = z1 - z_length_sq;
                this.addTriangle(x1, cur_y, z1, x2, cur_y, z2, x1, cur_y, z2); //
                this.addTriangle(x1, cur_y, z1, x2, cur_y, z1, x2, cur_y, z2); // 015
            }
        }
    }
}


