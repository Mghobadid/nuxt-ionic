import { onIonViewDidEnter, onIonViewDidLeave } from "@ionic/vue";
import { getCurrentInstance, onBeforeUnmount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { injectHead } from "#imports";
const headMap = /* @__PURE__ */ new Map();
let beforeHook;
let afterHook;
let currPath;
let prevPath;
export function useHead(obj, _) {
  const instance = getCurrentInstance();
  const activeHead = injectHead();
  const currentPath = instance && useRoute().path || "";
  let innerObj = obj;
  const __returned = {
    dispose() {
      const headArr = [...headMap.get(currentPath)];
      const headArrIndex = headArr.findIndex((headVal) => headVal[0] === innerObj);
      if (headArrIndex === -1) return;
      const headToDispose = headArr[headArrIndex][1];
      headToDispose?.dispose();
      headArr.splice(headArrIndex, 1);
      headMap.set(currentPath, headArr);
    },
    patch(newObj) {
      const headArr = [...headMap.get(currentPath)];
      const headArrIndex = headArr.findIndex((headVal) => headVal[0] === innerObj);
      if (headArrIndex === -1) return;
      const [, headToPatch] = headArr[headArrIndex];
      innerObj = newObj;
      headToPatch?.patch(innerObj);
      headArr.splice(headArrIndex, 1, [innerObj, headToPatch]);
      headMap.set(currentPath, headArr);
    }
  };
  if (!headMap.has(currentPath)) {
    const headObj = activeHead?.push(obj);
    headMap.set(currentPath, [[obj, headObj]]);
  } else {
    const headObj = activeHead?.push(obj);
    const metaArr = headMap.get(currentPath) || [];
    headMap.set(currentPath, [...metaArr, [obj, headObj]]);
  }
  if (instance) {
    const router = useRouter();
    const currentRoute = router.currentRoute;
    onBeforeUnmount(__returned.dispose);
    if (!beforeHook) {
      beforeHook = router?.beforeEach(() => {
        prevPath = currentRoute.value.path;
      });
    }
    if (!afterHook) {
      afterHook = router?.afterEach(() => {
        currPath = currentRoute.value.path;
      });
    }
    let hasReallyLeft = false;
    onIonViewDidLeave(() => {
      let headArr = headMap.get(prevPath);
      if (headArr) {
        headArr = headArr.map(([obj2, head]) => {
          head?.dispose();
          return [obj2, head];
        });
        headMap.set(prevPath, headArr);
      }
      hasReallyLeft = true;
    });
    onIonViewDidEnter(() => {
      if (hasReallyLeft) {
        let headArr = headMap.get(currPath);
        if (headArr) {
          headArr = headArr.map(([obj2, head]) => {
            head?.dispose();
            const newHead = activeHead?.push(obj2);
            return [obj2, newHead];
          });
          headMap.set(currPath, headArr);
        }
      }
    });
  }
  return __returned;
}
